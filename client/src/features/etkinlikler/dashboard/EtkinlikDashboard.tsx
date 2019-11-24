import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikListesi from "./EtkinlikListesi";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";
import EtkinlikDetaylari from "../detaylar/EtkinlikDetaylari";
import EtkinlikForm from "../form/EtkinlikForm";

const EtkinlikDashboard: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);
  const { duzenleModu, secilenEtkinlik } = etkinlikStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EtkinlikListesi />
      </Grid.Column>
      <Grid.Column width={6}>
        {secilenEtkinlik && !duzenleModu && <EtkinlikDetaylari />}
        {duzenleModu && (
          <EtkinlikForm
            key={(secilenEtkinlik && secilenEtkinlik.id) || 0}
            etkinlik={secilenEtkinlik!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(EtkinlikDashboard);
