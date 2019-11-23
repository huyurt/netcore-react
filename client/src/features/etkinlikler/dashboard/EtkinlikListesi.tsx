import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";

interface IProps {
  etkinlikler: IEtkinlik[];
  seciliEtkinlik: (id: string) => void;
  etkinlikSil: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const EtkinlikListesi: React.FC<IProps> = ({
  etkinlikler,
  seciliEtkinlik,
  etkinlikSil,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {etkinlikler.map(etkinlik => (
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
                  onClick={(e) => etkinlikSil(e, etkinlik.id)}
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
