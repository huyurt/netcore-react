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