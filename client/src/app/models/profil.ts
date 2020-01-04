export interface IProfil {
  displayName: string;
  userName: string;
  bio: string;
  resim: string;
  takipEdiliyor: boolean;
  takipciSayisi: number;
  takipEdilenSayisi: number;
  resimler: IResim[];
}

export interface IResim {
  id: string;
  url: string;
  anaResimMi: boolean;
}

export interface IKullaniciEtkinlik {
  id: string;
  baslik: string;
  kategori: string;
  tarih: Date;
}
