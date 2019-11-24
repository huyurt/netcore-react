import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";
import { observer } from "mobx-react-lite";

const EtkinlikDetaylari: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);
  const {
    secilenEtkinlik: etkinlik,
    etkinlikDuzenleFormu,
    seciliEtkinlikIptal
  } = etkinlikStore;
  return (
    <Card fluid>
      <Image
        src={`./assets/categoryImages/${etkinlik!.kategori}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{etkinlik!.baslik}</Card.Header>
        <Card.Meta>
          <span>{etkinlik!.tarih}</span>
        </Card.Meta>
        <Card.Description>{etkinlik!.aciklama}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => etkinlikDuzenleFormu(etkinlik!.id)}
            basic
            color="blue"
            content="Düzenle"
          />
          <Button
            onClick={seciliEtkinlikIptal}
            basic
            color="grey"
            content="İptal"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(EtkinlikDetaylari);
