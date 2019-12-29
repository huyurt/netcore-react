import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfil, IResim } from "../models/profil";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfilStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable profil: IProfil | null = null;
  @observable profilYukleniyor = false;
  @observable resimYukleniyor = false;
  @observable yukleniyor = false;

  @computed get isCurrentUser() {
    if (this.rootStore.kullaniciStore.kullanici && this.profil) {
      return (
        this.rootStore.kullaniciStore.kullanici.userName ===
        this.profil.userName
      );
    } else {
      return false;
    }
  }

  @action profilYukle = async (userName: string) => {
    try {
      const profil = await agent.Profil.get(userName);
      runInAction(() => {
        this.profil = profil;
        this.profilYukleniyor = false;
      });
    } catch (error) {
      runInAction(() => {
        this.profilYukleniyor = false;
      });
    }
  };

  @action uploadResim = async (file: Blob) => {
    this.resimYukleniyor = true;
    try {
      const resim = await agent.Profil.uploadResim(file);
      runInAction(() => {
        if (this.profil) {
          this.profil.resimler.push(resim);
          if (resim.anaResimMi && this.rootStore.kullaniciStore.kullanici) {
            this.rootStore.kullaniciStore.kullanici.image = resim.url;
            this.profil.resim = resim.url;
          }
        }
        this.resimYukleniyor = false;
      });
    } catch (error) {
      toast.error("Resim yüklenemedi.");
      runInAction(() => {
        this.resimYukleniyor = false;
      });
    }
  };

  @action setAnaResim = async (resim: IResim) => {
    this.yukleniyor = true;
    try {
      await agent.Profil.setAnaResim(resim.id);
      runInAction(() => {
        this.rootStore.kullaniciStore.kullanici!.image = resim.url;
        this.profil!.resimler.find(a => a.anaResimMi)!.anaResimMi = false;
        this.profil!.resimler.find(a => a.id === resim.id)!.anaResimMi = true;
        this.profil!.resim = resim.url;
        this.yukleniyor = false;
      });
    } catch (error) {
      toast.error("Ana resim ayarlanamadı.");
      runInAction(() => {
        this.yukleniyor = false;
      });
    }
  };

  @action resimSil = async (resim: IResim) => {
    this.yukleniyor = true;
    try {
      await agent.Profil.resimSil(resim.id);
      runInAction(() => {
        this.profil!.resimler = this.profil!.resimler.filter(
          a => a.id !== resim.id
        );
        this.yukleniyor = false;
      });
    } catch (error) {
      toast.error("Resim silinirken hata oluştu.");
      runInAction(() => {
        this.yukleniyor = false;
      });
    }
  };

  @action profilGuncelle = async (profil: Partial<IProfil>) => {
    try {
      await agent.Profil.profilGuncelle(profil);
      runInAction(() => {
        if (
          profil.displayName !==
          this.rootStore.kullaniciStore.kullanici!.displayName
        ) {
          this.rootStore.kullaniciStore.kullanici!.displayName = profil.displayName!;
        }
        this.profil = { ...this.profil!, ...profil };
      });
    } catch (error) {
      toast.error("Profil güncellenirken hata oluştu.");
    }
  };
}
