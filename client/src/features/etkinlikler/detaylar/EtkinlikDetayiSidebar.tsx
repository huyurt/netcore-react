import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IKatilimci } from "../../../app/models/etkinlik";
import { observer } from "mobx-react-lite";

interface IProps {
  katilimcilar: IKatilimci[];
}

const EtkinlikDetayiSidebar: React.FC<IProps> = ({ katilimcilar }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {katilimcilar.length} Kişi Katılıyor
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {katilimcilar.map(katilimci => (
            <Item style={{ position: "relative" }}>
              {katilimci.yayinlandiMi && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={katilimci.resim || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profile/${katilimci.kullaniciAdi}`}>
                    {katilimci.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(EtkinlikDetayiSidebar);
