import { observable, computed, action, runInAction, values } from "mobx";
import { IKullanici, IKullaniciFormValues } from "../models/kullanici";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";
import { ca } from "date-fns/locale";

export default class KullaniciStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable kullanici: IKullanici | null = null;

  @computed get isLoggedIn() {
    return !!this.kullanici;
  }

  @action login = async (values: IKullaniciFormValues) => {
    try {
      const kullanici = await agent.Kullanici.login(values);
      runInAction(() => {
        this.kullanici = kullanici;
      });
      this.rootStore.commonStore.setToken(kullanici.token);
      this.rootStore.modalStore.closeModal();
      history.push("/etkinlikler");
    } catch (error) {
      throw error;
    }
  };

  @action kayit = async (values: IKullaniciFormValues) => {
    try {
      const kullanici = await agent.Kullanici.kayit(values);
      this.rootStore.commonStore.setToken(kullanici.token);
      this.rootStore.modalStore.closeModal();
      history.push("/etkinlikler");
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const kullanici = await agent.Kullanici.current();
      runInAction(() => {
        this.kullanici = kullanici;
      });
    } catch (error) {}
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.kullanici = null;
    history.push("/");
  };
}
