import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import { IProfil, IResim, IKullaniciEtkinlik } from "../models/profil";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfilStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.aktifTab,
      aktifTab => {
        if (aktifTab === 3 || aktifTab === 4) {
          const predicate = aktifTab === 3 ? "takipciler" : "takipedilen";
          this.takipEdilenleriYukle(predicate);
        } else {
          this.takipEdilenler = [];
        }
      }
    );
  }

  @observable profil: IProfil | null = null;
  @observable profilYukleniyor = false;
  @observable resimYukleniyor = false;
  @observable yukleniyor = false;
  @observable takipEdilenler: IProfil[] = [];
  @observable aktifTab: number = 0;
  @observable kullaniciEtkinlikleri: IKullaniciEtkinlik[] = [];
  @observable etkinliklerYukleniyor = false;

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

  @action kullaniciEtkinlikleriniYukle = async (
    kullaniciAdi: string,
    predicate?: string
  ) => {
    this.etkinliklerYukleniyor = true;
    try {
      const etkinlikler = await agent.Profil.etkinlikleriListele(
        kullaniciAdi,
        predicate!
      );
      runInAction(() => {
        this.kullaniciEtkinlikleri = etkinlikler;
        this.etkinliklerYukleniyor = false;
      });
    } catch (error) {
      toast.error("Etkinlikler yüklenirken sorun oluştu.");
      runInAction(() => {
        this.etkinliklerYukleniyor = false;
      });
    }
  };

  @action setAktifTab = (aktifIndeks: number) => {
    this.aktifTab = aktifIndeks;
  };

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

  @action takipEt = async (kullaniciAdi: string) => {
    this.yukleniyor = true;
    try {
      await agent.Profil.takipEt(kullaniciAdi);
      runInAction(() => {
        this.profil!.takipEdiliyor = true;
        this.profil!.takipciSayisi++;
        this.yukleniyor = false;
      });
    } catch (error) {
      toast.error("Kullanıcı takip edilemedi.");
      runInAction(() => {
        this.yukleniyor = false;
      });
    }
  };

  @action takibiBirak = async (kullaniciAdi: string) => {
    this.yukleniyor = true;
    try {
      await agent.Profil.takibiBirak(kullaniciAdi);
      runInAction(() => {
        this.profil!.takipEdiliyor = false;
        this.profil!.takipciSayisi--;
        this.yukleniyor = false;
      });
    } catch (error) {
      toast.error("Kullanıcıyı takipten çıkılamadı.");
      runInAction(() => {
        this.yukleniyor = false;
      });
    }
  };

  @action takipEdilenleriYukle = async (predicate: string) => {
    this.yukleniyor = true;
    try {
      const profiller = await agent.Profil.takipEdilenleriListele(
        this.profil!.userName,
        predicate
      );
      runInAction(() => {
        this.takipEdilenler = profiller;
        this.yukleniyor = false;
      });
    } catch (error) {
      toast.error("Takip edilenler yüklenirken sorun oluştu.");
      runInAction(() => {
        this.yukleniyor = false;
      });
    }
  };
}
