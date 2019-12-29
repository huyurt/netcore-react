import React, { useContext, useState } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfilEditForm from "./ProfilEditForm";
import { observer } from "mobx-react-lite";

const ProfilDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { profilGuncelle, profil, isCurrentUser } = rootStore.profilStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`${profil!.displayName} Hakkında`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "İptal" : "Profili Düzenle"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfilEditForm profilGuncelle={profilGuncelle} profil={profil!} />
          ) : (
            <span>{profil!.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilDescription);
