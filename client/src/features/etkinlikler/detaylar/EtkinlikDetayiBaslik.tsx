import React from "react";
import { Segment, Item, Button, Image, Header } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {format} from 'date-fns';
import { tr } from "date-fns/locale";

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EtkinlikDetayiBaslik: React.FC<{ etkinlik: IEtkinlik }> = ({
  etkinlik
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${etkinlik.kategori}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={etkinlik.baslik}
                  style={{ color: "white" }}
                />
                <p>{format(etkinlik.tarih, "eeee dd MMMM", {locale: tr})}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button
          as={Link}
          to={`/manage/${etkinlik.id}`}
          color="orange"
          floated="right"
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(EtkinlikDetayiBaslik);
