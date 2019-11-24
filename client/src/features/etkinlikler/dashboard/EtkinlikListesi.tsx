import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";

const EtkinlikListesi: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);
  const { etkinliklerTariheGoreSirali, seciliEtkinlik, etkinlikSil, submitting, target } = etkinlikStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {etkinliklerTariheGoreSirali.map(etkinlik => (
          <Item key={etkinlik.id}>
            <Item.Content>
              <Item.Header as="a">{etkinlik.baslik}</Item.Header>
              <Item.Meta>{etkinlik.tarih}</Item.Meta>
              <Item.Description>
                <div>{etkinlik.aciklama}</div>
                <div>
                  {etkinlik.sehir}, {etkinlik.mekan}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => seciliEtkinlik(etkinlik.id)}
                  floated="right"
                  content="Görüntüle"
                  color="blue"
                />
                <Button
                  name={etkinlik.id}
                  loading={target === etkinlik.id && submitting}
                  onClick={e => etkinlikSil(e, etkinlik.id)}
                  floated="right"
                  content="Sil"
                  color="red"
                />
                <Label basic content={etkinlik.kategori} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EtkinlikListesi);
