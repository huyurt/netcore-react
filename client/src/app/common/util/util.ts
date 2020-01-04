import { IEtkinlik, IKatilimci } from "../../models/etkinlik";
import { IKullanici } from "../../models/kullanici";

export const combineDateAndTime = (date: Date, time: Date) => {
  //const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  //const year = date.getFullYear();
  //const month = date.getMonth();
  //const day = date.getDate();
  //const dateString = `${year}-${month}-${day}`;
  const dateString = date.toISOString().split('T')[0];
  const timeString = date.toISOString().split('T')[1];

  return new Date(dateString + "T" + timeString);
};

export const setEtkinlikProps = (
  etkinlik: IEtkinlik,
  kullanici: IKullanici
) => {
  etkinlik.tarih = new Date(etkinlik.tarih);
  etkinlik.gidiyorMu = etkinlik.katilimcilar.some(
    e => e.kullaniciAdi === kullanici.userName
  );
  etkinlik.yayinlandiMi = etkinlik.katilimcilar.some(
    e => e.kullaniciAdi === kullanici.userName && e.yayinlandiMi
  );
  return etkinlik;
};

export const katilimciOlustur = (kullanici: IKullanici): IKatilimci => {
  return {
    displayName: kullanici.displayName,
    yayinlandiMi: false,
    kullaniciAdi: kullanici.userName,
    resim: kullanici.image!
  };
};
