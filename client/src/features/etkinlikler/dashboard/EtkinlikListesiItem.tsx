import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { format } from "date-fns";

const EtkinlikListesiItem: React.FC<{ etkinlik: IEtkinlik }> = ({
  etkinlik
}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{etkinlik.baslik}</Item.Header>
              <Item.Description>Anonim tarafından paylaşıldı</Item.Description>
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
