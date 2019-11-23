import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { v4 as uuid } from "uuid";

interface IProps {
  setDuzenleModu: (duzenleModu: boolean) => void;
  etkinlik: IEtkinlik;
  etkinlikOlustur: (etkinlik: IEtkinlik) => void;
  etkinlikDuzenle: (etkinlik: IEtkinlik) => void;
}

export const EtkinlikForm: React.FC<IProps> = ({
  setDuzenleModu,
  etkinlik: formuAyarlaState,
  etkinlikOlustur,
  etkinlikDuzenle
}) => {
  const formuAyarla = () => {
    if (formuAyarlaState) {
      return formuAyarlaState;
    } else {
      return {
        id: "",
        baslik: "",
        aciklama: "",
        kategori: "",
        tarih: new Date().toISOString().split(".")[0],
        sehir: "",
        mekan: ""
      };
    }
  };

  const [etkinlik, setEtkinlik] = useState<IEtkinlik>(formuAyarla);

  const handleSubmit = () => {
    if (etkinlik.id.length === 0) {
      let yeniEtkinlik = {
        ...etkinlik,
        id: uuid()
      };
      etkinlikOlustur(yeniEtkinlik);
    } else {
      etkinlikDuzenle(etkinlik);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEtkinlik({ ...etkinlik, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="baslik"
          placeholder="Başlık"
          value={etkinlik.baslik}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="aciklama"
          rows={2}
          placeholder="Açıklama"
          value={etkinlik.aciklama}
        />
        <Form.Input
          onChange={handleInputChange}
          name="kategori"
          placeholder="Kategori"
          value={etkinlik.kategori}
        />
        <Form.Input
          onChange={handleInputChange}
          name="tarih"
          type="datetime-local"
          placeholder="Tarih"
          value={etkinlik.tarih}
        />
        <Form.Input
          onChange={handleInputChange}
          name="sehir"
          placeholder="Şehir"
          value={etkinlik.sehir}
        />
        <Form.Input
          onChange={handleInputChange}
          name="mekan"
          placeholder="Mekân"
          value={etkinlik.mekan}
        />
        <Button
          onClick={() => setDuzenleModu(false)}
          floated="right"
          type="button"
          content="İptal"
        />
        <Button floated="right" positive type="submit" content="Gönder" />
      </Form>
    </Segment>
  );
};
