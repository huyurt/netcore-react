export interface IKullanici {
  displayName: string;
  token: string;
  userName: string;
  image?: string;
}

export interface IKullaniciFormValues {
  displayName: string;
  userName?: string;
  email: string;
  password: string;
}
