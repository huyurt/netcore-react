import React, {
  useEffect,
  Fragment,
  useContext
} from "react";
import { Container } from "semantic-ui-react";
import { LoadingIndicator } from "./LoadingIndicator";
import EtkinlikStore from "../stores/EtkinlikStore";
import { observer } from "mobx-react-lite";
import EtkinlikDashboard from "../../features/etkinlikler/dashboard/EtkinlikDashboard";
import NavigationBar from "../../features/navigation/NavigationBar";

const App: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);

  useEffect(() => {
    etkinlikStore.etkinlikleriYukle();
  }, [etkinlikStore]);

  if (etkinlikStore.yukleniyorInit)
    return <LoadingIndicator content="Etkinlikler yükleniyor..." />;

  return (
    <Fragment>
      <NavigationBar />
      <Container style={{ marginTop: "7em" }}>
        <EtkinlikDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
