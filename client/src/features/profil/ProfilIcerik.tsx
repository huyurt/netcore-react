import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilResmi from "./ProfilResmi";
import ProfilDescription from "./ProfilDescription";

const panes = [
  { menuItem: "Hakkında", render: () => <ProfilDescription /> },
  { menuItem: "Resimler", render: () => <ProfilResmi /> },
  {
    menuItem: "Etkinlikler",
    render: () => <Tab.Pane>Etkinlik içeriği</Tab.Pane>
  },
  {
    menuItem: "Takipçiler",
    render: () => <Tab.Pane>Takipçiler içeriği</Tab.Pane>
  },
  {
    menuItem: "Takip Edilenler",
    render: () => <Tab.Pane>Takip edilenler içeriği</Tab.Pane>
  }
];

const ProfilIcerik = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfilIcerik;
