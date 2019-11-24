import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { v4 as uuid } from "uuid";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetayParams {
  id: string;
}

const EtkinlikForm: React.FC<RouteComponentProps<DetayParams>> = ({
  match,
  history
}) => {
  const etkinlikStore = useContext(EtkinlikStore);
  const {
    etkinlikOlustur,
    etkinlikDuzenle,
    submitting,
    etkinlik: formuAyarla,
    etkinlikYukle,
    etkinlikTemizle
  } = etkinlikStore;

  const [etkinlik, setEtkinlik] = useState<IEtkinlik>({
    id: "",
    baslik: "",
    aciklama: "",
    kategori: "",
    tarih: new Date().toISOString().split(".")[0],
    sehir: "",
    mekan: ""
  });

  useEffect(() => {
    if (match.params.id && etkinlik.id.length === 0) {
      etkinlikYukle(match.params.id).then(
        () => formuAyarla && setEtkinlik(formuAyarla)
      );
    }
    return () => {
      etkinlikTemizle();
    };
  }, [
    etkinlikYukle,
    match.params.id,
    etkinlikTemizle,
    formuAyarla,
    etkinlik.id.length
  ]);

  const handleSubmit = () => {
    if (etkinlik.id.length === 0) {
      let yeniEtkinlik = {
        ...etkinlik,
        id: uuid()
      };
      etkinlikOlustur(yeniEtkinlik).then(() =>
        history.push(`/etkinlikler/${yeniEtkinlik.id}`)
      );
    } else {
      etkinlikDuzenle(etkinlik).then(() =>
        history.push(`/etkinlikler/${etkinlik.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEtkinlik({ ...etkinlik, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
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
              onClick={() => history.push("/etkinlikler")}
              floated="right"
              type="button"
              content="İptal"
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Gönder"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EtkinlikForm);
