export interface IProfil {
  displayName: string;
  userName: string;
  bio: string;
  resim: string;
  resimler: IResim[];
}

export interface IResim {
  id: string;
  url: string;
  anaResimMi: boolean;
}
