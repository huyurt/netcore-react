export interface IKullanici {
  displayName: string;
  tokem: string;
  userName: string;
  image?: string;
}

export interface IKullaniciFormValues {
  displayName: string;
  userName?: string;
  email: string;
  password: string;
}
