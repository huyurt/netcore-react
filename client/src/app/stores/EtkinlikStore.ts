import { createContext, SyntheticEvent } from "react";
import { observable, action, computed, configure, runInAction } from "mobx";
import { IEtkinlik } from "../models/etkinlik";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class EtkinlikStore {
  @observable etkinlikRegistry = new Map();
  @observable etkinlik: IEtkinlik | null = null;
  @observable yukleniyorInit = false;
  @observable submitting = false;
  @observable target = "";

  @computed get etkinliklerTariheGoreSirali() {
    return this.etkinlikleriTariheGoreGrupla(
      Array.from(this.etkinlikRegistry.values())
    );
  }

  etkinlikleriTariheGoreGrupla(etkinlikler: IEtkinlik[]) {
    const siralanmisEtkinlikler = etkinlikler.sort(
      (x, y) => Date.parse(x.tarih) - Date.parse(y.tarih)
    );
    return Object.entries(
      siralanmisEtkinlikler.reduce((etkinlikler, etkinlik) => {
        const tarih = etkinlik.tarih.split("T")[0];
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
      const etkinlikler = await agent.Etkinlikler.listele();
      runInAction("etkinlikler yüklendi", () => {
        etkinlikler.forEach(etkinlik => {
          etkinlik.tarih = etkinlik.tarih.split(".")[0];
          this.etkinlikRegistry.set(etkinlik.id, etkinlik);
        });
      });
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
    } else {
      this.yukleniyorInit = true;
      try {
        etkinlik = await agent.Etkinlikler.detaylar(id);
        runInAction("etkinlik getirildi", () => {
          this.etkinlik = etkinlik;
          this.yukleniyorInit = false;
        });
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
      runInAction("etkinlik oluşturuldu", () => {
        this.etkinlikRegistry.set(etkinlik.id, etkinlik);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("etkinlik oluştur hatası", () => {
        this.submitting = false;
      });
      console.log(error);
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
    } catch (error) {
      runInAction("etkinlik güncelle hatası", () => {
        this.submitting = false;
      });
      console.log(error);
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

  @action etkinlikOlusturmaFormu = () => {
    this.etkinlik = null;
  };

  @action etkinlikDuzenleFormu = (id: string) => {
    this.etkinlik = this.etkinlikRegistry.get(id);
  };

  @action seciliEtkinlikIptal = () => {
    this.etkinlik = null;
  };

  @action seciliEtkinlik = (id: string) => {
    this.etkinlik = this.etkinlikRegistry.get(id);
  };
}

export default createContext(new EtkinlikStore());
