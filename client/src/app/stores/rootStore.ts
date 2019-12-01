import { createContext } from "react";
import EtkinlikStore from "./etkinlikStore";
import KullaniciStore from "./kullaniciStore";
import { configure } from "mobx";
import CommonStore from "./commonStore";

configure({ enforceActions: "always" });

export class RootStore{
    etkinlikStore: EtkinlikStore;
    kullaniciStore: KullaniciStore;
    commonStore: CommonStore;

    constructor(){
        this.etkinlikStore = new EtkinlikStore(this);
        this.kullaniciStore = new KullaniciStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());