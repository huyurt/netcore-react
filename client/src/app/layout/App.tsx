import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikDashboard from "../../features/etkinlikler/dashboard/EtkinlikDashboard";
import NavigationBar from "../../features/navigation/NavigationBar";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import AnaSayfa from "../../features/home/AnaSayfa";
import EtkinlikForm from "../../features/etkinlikler/form/EtkinlikForm";
import EtkinlikDetaylari from "../../features/etkinlikler/detaylar/EtkinlikDetaylari";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingIndicator } from "./LoadingIndicator";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilSayfasi from "../../features/profil/ProfilSayfasi";
import PrivateRoute from "./PrivateRoute";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.kullaniciStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingIndicator content="Uygulama yükleniyor..." />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={AnaSayfa} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavigationBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/etkinlikler"
                  component={EtkinlikDashboard}
                />
                <PrivateRoute
                  path="/etkinlikler/:id"
                  component={EtkinlikDetaylari}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/etkinlikOlustur", "/manage/:id"]}
                  component={EtkinlikForm}
                />
                <PrivateRoute
                  path="/profil/:username"
                  component={ProfilSayfasi}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
