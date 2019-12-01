import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { EtkinlikFormValues } from "../../../app/models/etkinlik";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { kategori } from "../../../app/common/options/kategoriOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  baslik: isRequired({ message: "Başlık giriniz." }),
  kategori: isRequired({ message: "Kategori seçiniz." }),
  aciklama: composeValidators(
    isRequired({ message: "Açıklama giriniz." }),
    hasLengthGreaterThan(4)({ message: "En az 5 karakter giriniz." })
  )(),
  sehir: isRequired({ message: "Şehir giriniz." }),
  mekan: isRequired({ message: "Mekân giriniz." }),
  tarih: isRequired({ message: "Tarih giriniz." }),
  saat: isRequired({ message: "Saat giriniz." })
});

interface DetayParams {
  id: string;
}

const EtkinlikForm: React.FC<RouteComponentProps<DetayParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    etkinlikOlustur,
    etkinlikDuzenle,
    submitting,
    etkinlikYukle
  } = rootStore.etkinlikStore;

  const [etkinlik, setEtkinlik] = useState(new EtkinlikFormValues());
  const [yukleniyor, setYukleniyor] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      etkinlikYukle(match.params.id)
        .then(etkinlik => setEtkinlik(new EtkinlikFormValues(etkinlik)))
        .finally(() => setYukleniyor(false));
    }
  }, [etkinlikYukle, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const tarihVeSaat = combineDateAndTime(values.tarih, values.saat);
    const { tarih, saat, ...etkinlik } = values;
    etkinlik.tarih = tarihVeSaat;
    if (!etkinlik.id) {
      let yeniEtkinlik = {
        ...etkinlik,
        id: uuid()
      };
      etkinlikOlustur(yeniEtkinlik);
    } else {
      etkinlikDuzenle(etkinlik);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={etkinlik}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={yukleniyor}>
                <Field
                  name="baslik"
                  placeholder="Başlık"
                  value={etkinlik.baslik}
                  children={TextInput}
                />
                <Field
                  name="aciklama"
                  placeholder="Açıklama"
                  rows={3}
                  value={etkinlik.aciklama}
                  children={TextAreaInput}
                />
                <Field
                  name="kategori"
                  placeholder="Kategori"
                  options={kategori}
                  value={etkinlik.kategori}
                  children={SelectInput}
                />
                <Form.Group>
                  <Field
                    name="tarih"
                    placeholder="Tarih"
                    date={true}
                    value={etkinlik.tarih}
                    children={DateInput}
                  />
                  <Field
                    name="saat"
                    placeholder="Saat"
                    time={true}
                    value={etkinlik.saat!}
                    children={DateInput}
                  />
                </Form.Group>
                <Field
                  name="sehir"
                  placeholder="Şehir"
                  value={etkinlik.sehir}
                  children={TextInput}
                />
                <Field
                  name="mekan"
                  placeholder="Mekân"
                  value={etkinlik.mekan}
                  children={TextInput}
                />
                <Button
                  onClick={() => history.push("/etkinlikler")}
                  disabled={yukleniyor || invalid || pristine}
                  floated="right"
                  type="button"
                  content="İptal"
                />
                <Button
                  onClick={
                    etkinlik.id
                      ? () => history.push(`/etkinlikler/${etkinlik.id}`)
                      : () => history.push("/etkinlikler")
                  }
                  loading={submitting}
                  disabled={yukleniyor}
                  floated="right"
                  positive
                  type="submit"
                  content="Gönder"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EtkinlikForm);
