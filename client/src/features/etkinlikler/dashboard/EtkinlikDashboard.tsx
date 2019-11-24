import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikListesi from "./EtkinlikListesi";
import { LoadingIndicator } from "../../../app/layout/LoadingIndicator";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";

const EtkinlikDashboard: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);

  useEffect(() => {
    etkinlikStore.etkinlikleriYukle();
  }, [etkinlikStore]);

  if (etkinlikStore.yukleniyorInit)
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
