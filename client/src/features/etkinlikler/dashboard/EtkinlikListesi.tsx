import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikListesiItem from "./EtkinlikListesiItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const EtkinlikListesi: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { etkinliklerTariheGoreSirali } = rootStore.etkinlikStore;
  return (
    <Fragment>
      {etkinliklerTariheGoreSirali.map(([grup, etkinlikler]) => (
        <Fragment>
          <Label key={grup} size="large" color="blue">
            {format(grup, "eeee dd MMMM", { locale: tr })}
          </Label>
          <Item.Group divided>
            {etkinlikler.map(etkinlik => (
              <EtkinlikListesiItem key={etkinlik.id} etkinlik={etkinlik} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(EtkinlikListesi);
