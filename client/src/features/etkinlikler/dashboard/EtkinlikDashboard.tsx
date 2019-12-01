import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikListesi from "./EtkinlikListesi";
import { LoadingIndicator } from "../../../app/layout/LoadingIndicator";
import { RootStoreContext } from "../../../app/stores/rootStore";

const EtkinlikDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { etkinlikleriYukle, yukleniyorInit } = rootStore.etkinlikStore;

  useEffect(() => {
    etkinlikleriYukle();
  }, [etkinlikleriYukle]);

  if (yukleniyorInit)
    return <LoadingIndicator content="Etkinlikler yükleniyor..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EtkinlikListesi />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Etkinlik Filtrele</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EtkinlikDashboard);
