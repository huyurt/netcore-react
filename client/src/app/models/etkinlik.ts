export interface IEtkinlik {
  id: string;
  baslik: string;
  aciklama: string;
  kategori: string;
  tarih: Date;
  sehir: string;
  mekan: string;
}

export interface IEtkinlikFormValues extends Partial<IEtkinlik> {
  saat?: Date;
}

export class EtkinlikFormValues implements IEtkinlikFormValues {
  id?: string = undefined;
  baslik: string = "";
  aciklama: string = "";
  kategori: string = "";
  tarih?: Date = undefined;
  saat?: Date = undefined;
  sehir: string = "";
  mekan: string = "";

  constructor(init?: IEtkinlikFormValues) {
    if (init && init.tarih) {
      init.saat = init.tarih;
    }
    Object.assign(this, init);
  }
}
