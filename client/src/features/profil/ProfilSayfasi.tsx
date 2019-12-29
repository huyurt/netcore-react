import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfilBaslik from "./ProfilBaslik";
import ProfilIcerik from "./ProfilIcerik";
import { RootStoreContext } from "../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { LoadingIndicator } from "../../app/layout/LoadingIndicator";
import { observer } from "mobx-react-lite";

interface RouteParams {
  userName: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilSayfasi: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { profilYukleniyor, profil, profilYukle } = rootStore.profilStore;

  useEffect(() => {
    profilYukle(match.params.userName);
  }, [profilYukle, match]);

  if (profilYukleniyor)
    return <LoadingIndicator content="Profil yükleniyor..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfilBaslik profil={profil!} />
        <ProfilIcerik />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilSayfasi);
