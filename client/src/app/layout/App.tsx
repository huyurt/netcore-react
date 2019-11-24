import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikDashboard from "../../features/etkinlikler/dashboard/EtkinlikDashboard";
import NavigationBar from "../../features/navigation/NavigationBar";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import AnaSayfa from "../../features/home/AnaSayfa";
import EtkinlikForm from "../../features/etkinlikler/form/EtkinlikForm";
import EtkinlikDetaylari from "../../features/etkinlikler/detaylar/EtkinlikDetaylari";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={AnaSayfa} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavigationBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/" component={AnaSayfa} />
              <Route exact path="/etkinlikler" component={EtkinlikDashboard} />
              <Route path="/etkinlikler/:id" component={EtkinlikDetaylari} />
              <Route
                key={location.key}
                path={["/etkinlikOlustur", "/manage/:id"]}
                component={EtkinlikForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
