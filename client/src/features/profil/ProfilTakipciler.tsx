import React, { useContext } from "react";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfilCard from "./ProfilCard";

const ProfilTakipcileri = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profil,
    takipEdilenler,
    yukleniyor,
    aktifTab
  } = rootStore.profilStore;

  return (
    <Tab.Pane loading={yukleniyor}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              aktifTab === 3
                ? `${profil!.displayName} takip ediyor.`
                : `${profil!.displayName} takip ediliyor.`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {takipEdilenler.map(profil => (
              <ProfilCard key={profil.userName} profil={profil} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfilTakipcileri;
