import React, { useContext, useEffect } from "react";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { LoadingIndicator } from "../../../app/layout/LoadingIndicator";
import { Link } from "react-router-dom";
import EtkinlikDetayiBaslik from "./EtkinlikDetayiBaslik";
import EtkinlikDetayiBilgi from "./EtkinlikDetayiBilgi";
import EtkinlikDetayiSohbet from "./EtkinlikDetayiSohbet";
import EtkinlikDetayiSidebar from "./EtkinlikDetayiSidebar";

interface DetayParams {
  id: string;
}

const EtkinlikDetaylari: React.FC<RouteComponentProps<DetayParams>> = ({
  match,
  history
}) => {
  const etkinlikStore = useContext(EtkinlikStore);
  const { etkinlik, etkinlikYukle, yukleniyorInit } = etkinlikStore;

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
