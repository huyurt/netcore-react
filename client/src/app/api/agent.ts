import axios, { AxiosResponse } from "axios";
import { IEtkinlik } from "../models/etkinlik";

axios.defaults.baseURL = "http://localhost:5000";
const etkinliklerPath = "/api/etkinlikler";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(revolse =>
    setTimeout(() => revolse(response), ms)
  );

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
};

const Etkinlikler = {
  listele: (): Promise<IEtkinlik[]> => request.get(etkinliklerPath),
  detaylar: (id: string) => request.get(`${etkinliklerPath}/${id}`),
  olustur: (etkinlik: IEtkinlik) => request.post(etkinliklerPath, etkinlik),
  guncelle: (etkinlik: IEtkinlik) =>
    request.put(`${etkinliklerPath}/${etkinlik.id}`, etkinlik),
  sil: (id: string) => request.del(`${etkinliklerPath}/${id}`)
};

export default { Etkinlikler };
