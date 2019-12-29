import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { format } from "date-fns";
import EtkinlikListItemKatilimcilar from "./EtkinlikListesiItemKatilimcilar";

const EtkinlikListesiItem: React.FC<{ etkinlik: IEtkinlik }> = ({
  etkinlik
}) => {
  const host = etkinlik.katilimcilar.filter(x => x.yayinlandiMi)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host.resim || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/etkinlikler/${etkinlik.id}`}>
                {etkinlik.baslik}
              </Item.Header>
              <Item.Description>
                {host.displayName} tarafından paylaşıldı
              </Item.Description>
              {etkinlik.yayinlandiMi && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="Bu etkinliği yayınladın"
                  />
                </Item.Description>
              )}
              {etkinlik.gidiyorMu && !etkinlik.yayinlandiMi && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="Bu etkinliğe gidiyorsun"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {format(etkinlik.tarih, "HH:mm")}
        <Icon name="marker" />
        {etkinlik.mekan}, {etkinlik.sehir}
      </Segment>
      <Segment secondary>
        <EtkinlikListItemKatilimcilar katilimcilar={etkinlik.katilimcilar} />
      </Segment>
      <Segment secondary>Katılanlar burada görüntülecek</Segment>
      <Segment clearing>
        <span>{etkinlik.aciklama}</span>
        <Button
          as={Link}
          to={`/etkinlikler/${etkinlik.id}`}
          floated="right"
          content="Görüntüle"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EtkinlikListesiItem;
