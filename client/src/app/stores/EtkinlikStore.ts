import { createContext, SyntheticEvent } from "react";
import { observable, action, computed, configure, runInAction } from "mobx";
import { IEtkinlik } from "../models/etkinlik";
import agent from "../api/agent";
import { async } from "q";

configure({ enforceActions: "always" });

class EtkinlikStore {
  @observable etkinlikRegistry = new Map();
  @observable etkinlikler: IEtkinlik[] = [];
  @observable secilenEtkinlik: IEtkinlik | undefined;
  @observable yukleniyorInit = false;
  @observable duzenleModu = false;
  @observable submitting = false;
  @observable target = "";

  @computed get etkinliklerTariheGoreSirali() {
    return Array.from(this.etkinlikRegistry.values()).sort(
      (x, y) => Date.parse(x.tarih) - Date.parse(y.tarih)
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
      console.log(error);
    }
  };

  @action etkinlikOlustur = async (etkinlik: IEtkinlik) => {
    this.submitting = true;
    try {
      await agent.Etkinlikler.olustur(etkinlik);
      runInAction("etkinlik oluşturuldu", () => {
        this.etkinlikRegistry.set(etkinlik.id, etkinlik);
        this.duzenleModu = false;
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
        this.secilenEtkinlik = etkinlik;
        this.duzenleModu = false;
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
    this.duzenleModu = true;
    this.secilenEtkinlik = undefined;
  };

  @action etkinlikDuzenleFormu = (id: string) => {
    this.secilenEtkinlik = this.etkinlikRegistry.get(id);
    this.duzenleModu = true;
  };

  @action seciliEtkinlikIptal = () => {
    this.secilenEtkinlik = undefined;
  };

  @action etkinlikIptalFormu = () => {
    this.duzenleModu = false;
  };

  @action seciliEtkinlik = (id: string) => {
    this.secilenEtkinlik = this.etkinlikRegistry.get(id);
    this.duzenleModu = false;
  };
}

export default createContext(new EtkinlikStore());
