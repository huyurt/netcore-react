import { SyntheticEvent } from "react";
import { observable, action, computed, runInAction } from "mobx";
import { IEtkinlik } from "../models/etkinlik";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

export default class EtkinlikStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

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
      const etkinlikler = await agent.Etkinlikler.listele();
      runInAction("etkinlikler yüklendi", () => {
        etkinlikler.forEach(etkinlik => {
          etkinlik.tarih = new Date(etkinlik.tarih);
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
      return etkinlik;
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
