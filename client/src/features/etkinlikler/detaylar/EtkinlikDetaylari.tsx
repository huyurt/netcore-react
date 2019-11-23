import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";

interface IProps {
  etkinlik: IEtkinlik;
  setDuzenleModu: (duzenleModu: boolean) => void;
  setSecilenEtkinlik: (etkinlik: IEtkinlik | null) => void;
}

export const EtkinlikDetaylari: React.FC<IProps> = ({
  etkinlik,
  setDuzenleModu,
  setSecilenEtkinlik
}) => {
  return (
    <Card fluid>
      <Image
        src={`./assets/categoryImages/${etkinlik.kategori}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{etkinlik.baslik}</Card.Header>
        <Card.Meta>
          <span>{etkinlik.tarih}</span>
        </Card.Meta>
        <Card.Description>{etkinlik.aciklama}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setDuzenleModu(true)}
            basic
            color="blue"
            content="Düzenle"
          />
          <Button
            onClick={() => setSecilenEtkinlik(null)}
            basic
            color="grey"
            content="İptal"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
