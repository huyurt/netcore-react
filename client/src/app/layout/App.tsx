import React, { Fragment } from "react";
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

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path="/" component={AnaSayfa} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavigationBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/" component={AnaSayfa} />
                <Route
                  exact
                  path="/etkinlikler"
                  component={EtkinlikDashboard}
                />
                <Route path="/etkinlikler/:id" component={EtkinlikDetaylari} />
                <Route
                  key={location.key}
                  path={["/etkinlikOlustur", "/manage/:id"]}
                  component={EtkinlikForm}
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
