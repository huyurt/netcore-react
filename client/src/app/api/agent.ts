import axios, { AxiosResponse } from "axios";
import { IEtkinlik } from "../models/etkinlik";
import { history } from "../..";
import { toast } from "react-toastify";
import { IKullanici, IKullaniciFormValues } from "../models/kullanici";
import { IProfil, IResim } from "../models/profil";

axios.defaults.baseURL = "http://localhost:5000";
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Bağlantı hatası");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.error.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Sunucu hatası");
  }
  throw error.response;
});

const etkinliklerPath = "/api/etkinlikler";

const responseBody = (response: AxiosResponse) => response.data;

const bekle = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(revolse =>
    setTimeout(() => revolse(response), ms)
  );

const request = {
  get: (url: string) =>
    axios
      .get(url)
      .then(bekle(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(bekle(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(bekle(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(bekle(1000))
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(responseBody);
  }
};

const Etkinlikler = {
  listele: (): Promise<IEtkinlik[]> => request.get(etkinliklerPath),
  detaylar: (id: string) => request.get(`${etkinliklerPath}/${id}`),
  olustur: (etkinlik: IEtkinlik) => request.post(etkinliklerPath, etkinlik),
  guncelle: (etkinlik: IEtkinlik) =>
    request.put(`${etkinliklerPath}/${etkinlik.id}`, etkinlik),
  sil: (id: string) => request.del(`${etkinliklerPath}/${id}`),
  katil: (id: string) => request.post(`${etkinliklerPath}/${id}/katil`, {}),
  katilma: (id: string) => request.del(`${etkinliklerPath}/${id}/katil`)
};

const Kullanici = {
  current: (): Promise<IKullanici> => request.get("/kullanici"),
  login: (kullanici: IKullaniciFormValues): Promise<IKullanici> =>
    request.post(`kullanici/giris`, kullanici),
  kayit: (kullanici: IKullaniciFormValues): Promise<IKullanici> =>
    request.post(`kullanici/kayit`, kullanici)
};

const Profil = {
  get: (userName: string): Promise<IProfil> =>
    request.get(`/profil/${userName}`),
  uploadResim: (resim: Blob): Promise<IResim> =>
    request.postForm(`/resim`, resim),
  setAnaResim: (id: string) => request.post(`/resim/${id}/setMain`, {}),
  resimSil: (id: string) => request.del(`/resim/${id}`),
  profilGuncelle: (profil: Partial<IProfil>) => request.put(`/profil`, profil),
  takipEt: (kullaniciAdi: string) =>
    request.post(`/profil/${kullaniciAdi}/takip`, {}),
  takibiBirak: (kullaniciAdi: string) => request.del(`/profil/${kullaniciAdi}`),
  takipEdilenleriListele: (kullaniciAdi: string, predicate: string) =>
    request.get(`/profil/${kullaniciAdi}/takip?predicate=${predicate}`)
};

export default { Etkinlikler, Kullanici, Profil };
