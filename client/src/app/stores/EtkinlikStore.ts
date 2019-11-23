import { createContext } from "react";
import { observable, action } from "mobx";
import { IEtkinlik } from "../models/etkinlik";
import agent from "../api/agent";

class EtkinlikStore {
  @observable etkinlikler: IEtkinlik[] = [];
  @observable yukleniyor = false;

  @action etkinlikleriYukle = () => {
    this.yukleniyor = true;
    agent.Etkinlikler.listele()
      .then(etkinlikler => {
        etkinlikler.forEach(etkinlik => {
          etkinlik.tarih = etkinlik.tarih.split(".")[0];
          this.etkinlikler.push(etkinlik);
        });
      })
      .finally(() => (this.yukleniyor = false));
  };
}

export default createContext(new EtkinlikStore());
