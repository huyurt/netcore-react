import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { LoadingIndicator } from "../../../app/layout/LoadingIndicator";
import EtkinlikDetayiBaslik from "./EtkinlikDetayiBaslik";
import EtkinlikDetayiBilgi from "./EtkinlikDetayiBilgi";
import EtkinlikDetayiSohbet from "./EtkinlikDetayiSohbet";
import EtkinlikDetayiSidebar from "./EtkinlikDetayiSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetayParams {
  id: string;
}

const EtkinlikDetaylari: React.FC<RouteComponentProps<DetayParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { etkinlik, etkinlikYukle, yukleniyorInit } = rootStore.etkinlikStore;

  useEffect(() => {
    etkinlikYukle(match.params.id);
  }, [etkinlikYukle, match.params.id, history]);

  if (yukleniyorInit || !etkinlik)
    return <LoadingIndicator content="Etkinlik yükleniyor..." />;

  if (!etkinlik) return <h2>Etkinlik bulunamadı</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EtkinlikDetayiBaslik etkinlik={etkinlik} />
        <EtkinlikDetayiBilgi etkinlik={etkinlik} />
        <EtkinlikDetayiSohbet />
      </Grid.Column>
      <Grid.Column width={6}>
        <EtkinlikDetayiSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EtkinlikDetaylari);
