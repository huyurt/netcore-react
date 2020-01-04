import axios, { AxiosResponse } from "axios";
import { IEtkinlik, IEtkinlikEnvelope } from "../models/etkinlik";
import { history } from "../..";
import { toast } from "react-toastify";
import { IKullanici, IKullaniciFormValues } from "../models/kullanici";
import { IProfil, IResim } from "../models/profil";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 401 &&
    headers["www-authenticate"] ===
      'Bearer error="invalid_token", error_description="The token is expired"'
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Oturum süreniz bitmiştir, lütfen tekrar giriş yapınız.");
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

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
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
  listele: (params: URLSearchParams): Promise<IEtkinlikEnvelope> =>
    axios.get("/etkinlikler", { params: params }).then(responseBody),
  detaylar: (id: string) => request.get(`/etkinlikler/${id}`),
  olustur: (etkinlik: IEtkinlik) => request.post("/etkinlikler", etkinlik),
  guncelle: (etkinlik: IEtkinlik) =>
    request.put(`/etkinlikler/${etkinlik.id}`, etkinlik),
  sil: (id: string) => request.del(`/etkinlikler/${id}`),
  katil: (id: string) => request.post(`$/etkinlikler/${id}/katil`, {}),
  katilma: (id: string) => request.del(`/etkinlikler/${id}/katil`)
};

const Kullanici = {
  current: (): Promise<IKullanici> => request.get("/kullanici"),
  login: (kullanici: IKullaniciFormValues): Promise<IKullanici> =>
    request.post(`/kullanici/giris`, kullanici),
  kayit: (kullanici: IKullaniciFormValues): Promise<IKullanici> =>
    request.post(`/kullanici/kayit`, kullanici)
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
    request.get(`/profil/${kullaniciAdi}/takip?predicate=${predicate}`),
  etkinlikleriListele: (kullaniciAdi: string, predicate: string) =>
    request.get(`/profil/${kullaniciAdi}/etkinlikler?predicate=${predicate}`)
};

export default { Etkinlikler, Kullanici, Profil };
