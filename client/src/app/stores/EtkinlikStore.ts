import { SyntheticEvent } from "react";
import {
  observable,
  action,
  computed,
  runInAction,
  reaction,
  toJS
} from "mobx";
import { IEtkinlik } from "../models/etkinlik";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setEtkinlikProps, katilimciOlustur } from "../common/util/util";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

const LIMIT = 2;

export default class EtkinlikStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.sayfa = 0;
        this.etkinlikRegistry.clear();
        this.etkinlikleriYukle();
      }
    );
  }

  @observable etkinlikRegistry = new Map();
  @observable etkinlik: IEtkinlik | null = null;
  @observable yukleniyorInit = false;
  @observable submitting = false;
  @observable target = "";
  @observable yukleniyor = false;
  @observable.ref hubConnection: HubConnection | null = null;
  @observable etkinlikSayisi = 0;
  @observable sayfa = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== "all") {
      this.predicate.set(predicate, value);
    }
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    params.append("offset", `${this.sayfa ? this.sayfa * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  @computed get toplamSayfa() {
    return Math.ceil(this.etkinlikSayisi / LIMIT);
  }

  @action setSayfa = (sayfa: number) => {
    this.sayfa = sayfa;
  };

  @action hubConnectionOlustur = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch(error => console.log("Bağlanırken hata oluştu: ", error));

    this.hubConnection.on("YorumYapildi", yorum => {
      runInAction(() => {
        this.etkinlik!.yorumlar.push(yorum);
      });
    });
  };

  @action hubConnectionDurdur = () => {
    this.hubConnection!.stop();
  };

  @action yorumEkle = async (values: any) => {
    values.etkinlikId = this.etkinlik!.id;
    try {
      await this.hubConnection!.invoke("YorumGonder", values);
    } catch (error) {}
  };

  @computed get etkinliklerTariheGoreSirali() {
    return this.etkinlikleriTariheGoreGrupla(
      Array.from(this.etkinlikRegistry.values())
    );
  }

  etkinlikleriTariheGoreGrupla(etkinlikler: IEtkinlik[]) {
    const siralanmisEtkinlikler = etkinlikler.sort(
      (x, y) => x.tarih.getTime() - y.tarih.getTime()
    );
    return Object.entries(
      siralanmisEtkinlikler.reduce((etkinlikler, etkinlik) => {
        const tarih = etkinlik.tarih.toISOString().split("T")[0];
        etkinlikler[tarih] = etkinlikler[tarih]
          ? [...etkinlikler[tarih], etkinlik]
          : [etkinlik];
        return etkinlikler;
      }, {} as { [key: string]: IEtkinlik[] })
    );
  }

  @action etkinlikleriYukle = async () => {
    this.yukleniyorInit = true;
    try {
      const etkinliklerEnvelope = await agent.Etkinlikler.listele(
        this.axiosParams
      );
      const { etkinlikler, etkinlikSayisi } = etkinliklerEnvelope;
      runInAction("etkinlikler yüklendi", () => {
        etkinlikler.forEach(etkinlik => {
          setEtkinlikProps(etkinlik, this.rootStore.kullaniciStore.kullanici!);
          this.etkinlikRegistry.set(etkinlik.id, etkinlik);
        });
      });
      this.etkinlikSayisi = etkinlikSayisi;
      this.yukleniyorInit = false;
    } catch (error) {
      runInAction("etkinlikleri yükle hatası", () => {
        this.yukleniyorInit = false;
      });
    }
  };

  @action etkinlikYukle = async (id: string) => {
    let etkinlik = this.getEtkinlik(id);
    if (etkinlik) {
      this.etkinlik = etkinlik;
      return toJS(etkinlik);
    } else {
      this.yukleniyorInit = true;
      try {
        etkinlik = await agent.Etkinlikler.detaylar(id);
        runInAction("etkinlik getirildi", () => {
          etkinlik.tarih = new Date(etkinlik.tarih);
          this.etkinlik = etkinlik;
          this.etkinlikRegistry.set(etkinlik.id, etkinlik);
          this.yukleniyorInit = false;
        });
        return etkinlik;
      } catch (error) {
        runInAction("etkinlik getirildi", () => {
          this.yukleniyorInit = false;
        });
        console.log(error);
      }
    }
  };

  @action etkinlikTemizle = () => {
    this.etkinlik = null;
  };

  getEtkinlik = (id: string) => {
    return this.etkinlikRegistry.get(id);
  };

  @action etkinlikOlustur = async (etkinlik: IEtkinlik) => {
    this.submitting = true;
    try {
      await agent.Etkinlikler.olustur(etkinlik);
      const katilimci = katilimciOlustur(
        this.rootStore.kullaniciStore.kullanici!
      );
      katilimci.yayinlandiMi = true;
      let katilimcilar = [];
      katilimcilar.push(katilimci);
      etkinlik.katilimcilar = katilimcilar;
      etkinlik.yorumlar = [];
      etkinlik.yayinlandiMi = true;
      runInAction("etkinlik oluşturuldu", () => {
        this.etkinlikRegistry.set(etkinlik.id, etkinlik);
        this.submitting = false;
      });
      history.push(`/etkinlikler/${etkinlik.id}`);
    } catch (error) {
      runInAction("etkinlik oluştur hatası", () => {
        this.submitting = false;
      });
      toast.error("Veri gönderilirken hata oluştu.");
    }
  };

  @action etkinlikDuzenle = async (etkinlik: IEtkinlik) => {
    this.submitting = true;
    try {
      await agent.Etkinlikler.guncelle(etkinlik);
      runInAction("etkinlik güncellendi", () => {
        this.etkinlikRegistry.set(etkinlik.id, etkinlik);
        this.etkinlik = etkinlik;
        this.submitting = false;
      });
      history.push(`/etkinlikler/${etkinlik.id}`);
    } catch (error) {
      runInAction("etkinlik güncelle hatası", () => {
        this.submitting = false;
      });
      toast.error("Veri gönderilirken hata oluştu.");
    }
  };

  @action etkinlikSil = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Etkinlikler.sil(id);
      runInAction("etkinlik silindi", () => {
        this.etkinlikRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("etkinlik sil hatası", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action etkinlikKatilim = async () => {
    const katilimci = katilimciOlustur(
      this.rootStore.kullaniciStore.kullanici!
    );
    this.yukleniyor = true;
    try {
      await agent.Etkinlikler.katil(this.etkinlik!.id);
      runInAction(() => {
        if (this.etkinlik) {
          this.etkinlik.katilimcilar.push(katilimci);
          this.etkinlik.gidiyorMu = true;
          this.etkinlikRegistry.set(this.etkinlik.id, this.etkinlik);
          this.yukleniyor = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.yukleniyor = false;
      });
      toast.error("Etkinliğe katılım oluşturulamadı.");
    }
  };

  @action katilimIptal = async () => {
    this.yukleniyor = true;
    try {
      await agent.Etkinlikler.katilma(this.etkinlik!.id);
      runInAction(() => {
        if (this.etkinlik) {
          this.etkinlik.katilimcilar = this.etkinlik.katilimcilar.filter(
            e =>
              e.kullaniciAdi !==
              this.rootStore.kullaniciStore.kullanici!.userName
          );
          this.etkinlik.gidiyorMu = false;
          this.etkinlikRegistry.set(this.etkinlik.id, this.etkinlik);
          this.yukleniyor = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.yukleniyor = false;
      });
      toast.error("Etkinliğe katılım iptal edilemedi.");
    }
  };
}
