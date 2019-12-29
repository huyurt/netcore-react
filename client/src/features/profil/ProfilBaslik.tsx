import React from "react";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal
} from "semantic-ui-react";
import { IProfil } from "../../app/models/profil";
import { observer } from "mobx-react-lite";

interface IProps {
  profil: IProfil;
}

const ProfilBaslik: React.FC<IProps> = ({ profil }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profil.resim || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{profil.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value="5" />
            <Statistic label="Following" value="42" />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following" />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button
                fluid
                basic
                color={true ? "red" : "green"}
                content={true ? "Unfollow" : "Follow"}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfilBaslik);
