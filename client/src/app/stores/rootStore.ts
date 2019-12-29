import { createContext } from "react";
import EtkinlikStore from "./etkinlikStore";
import KullaniciStore from "./kullaniciStore";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfilStore from "./profilStore";

configure({ enforceActions: "always" });

export class RootStore {
  etkinlikStore: EtkinlikStore;
  kullaniciStore: KullaniciStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profilStore: ProfilStore;

  constructor() {
    this.etkinlikStore = new EtkinlikStore(this);
    this.kullaniciStore = new KullaniciStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profilStore = new ProfilStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
