import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilResmi from "./ProfilResmi";
import ProfilDescription from "./ProfilDescription";
import ProfilTakipcileri from "./ProfilTakipciler";
import ProfilEtkinlikler from "./ProfilEtkinlikler";

const panes = [
  { menuItem: "Hakkında", render: () => <ProfilDescription /> },
  { menuItem: "Resimler", render: () => <ProfilResmi /> },
  {
    menuItem: "Etkinlikler",
    render: () => <ProfilEtkinlikler />
  },
  {
    menuItem: "Takipçiler",
    render: () => <ProfilTakipcileri />
  },
  {
    menuItem: "Takip Edilenler",
    render: () => <ProfilTakipcileri />
  }
];

interface IProps {
  setAktifTab: (aktifIndex: any) => void;
}

const ProfilIcerik: React.FC<IProps> = ({ setAktifTab }) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setAktifTab(data.activeIndex)}
    />
  );
};

export default ProfilIcerik;
