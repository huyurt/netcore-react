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
  isCurrentUser: boolean;
  yukleniyor: boolean;
  takipEt: (kullaniciAdi: string) => void;
  takibiBirak: (kullaniciAdi: string) => void;
}

const ProfilBaslik: React.FC<IProps> = ({
  profil,
  isCurrentUser,
  yukleniyor,
  takipEt,
  takibiBirak
}) => {
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
            <Statistic label="Takipçi" value={profil.takipciSayisi} />
            <Statistic label="Takip Edilen" value={profil.takipEdilenSayisi} />
          </Statistic.Group>
          <Divider />
          {!isCurrentUser && (
            <Reveal animated="move">
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button
                  fluid
                  color="teal"
                  content={
                    profil.takipEdiliyor ? "Takip ediliyor" : "Takip edilmiyor"
                  }
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  loading={yukleniyor}
                  fluid
                  basic
                  color={profil.takipEdiliyor ? "red" : "green"}
                  content={profil.takipEdiliyor ? "Takibi Bırak" : "Takip Et"}
                  onClick={
                    profil.takipEdiliyor
                      ? () => takibiBirak(profil.userName)
                      : () => takipEt(profil.userName)
                  }
                />
              </Reveal.Content>
            </Reveal>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfilBaslik);
