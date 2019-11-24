import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikStore from "../../../app/stores/EtkinlikStore";
import EtkinlikListesiItem from "./EtkinlikListesiItem";

const EtkinlikListesi: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);
  const { etkinliklerTariheGoreSirali } = etkinlikStore;
  return (
    <Fragment>
      {etkinliklerTariheGoreSirali.map(([grup, etkinlikler]) => (
        <Fragment>
          <Label key={grup} size="large" color="blue">
            {grup}
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
