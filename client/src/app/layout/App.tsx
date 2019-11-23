import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IEtkinlik } from "../models/etkinlik";
import { NavigationBar } from "../../features/navigation/NavigationBar";
import { EtkinlikDashboard } from "../../features/etkinlikler/dashboard/EtkinlikDashboard";

const App: React.FC = () => {
  const [etkinlikler, setEtkinlikler] = useState<IEtkinlik[]>([]);
  const [seciliEtkinlik, setSeciliEtkinlik] = useState<IEtkinlik | null>(null);
  const [duzenleModu, setDuzenleModu] = useState(false);

  const handleSeciliEtkinlik = (id: string) => {
    setSeciliEtkinlik(etkinlikler.filter(etkinlik => etkinlik.id === id)[0]);
    setDuzenleModu(false);
  };

  const handleEtkinlikOlusturmaFormu = () => {
    setSeciliEtkinlik(null);
    setDuzenleModu(true);
  };

  const handleEtkinlikOlustur = (etkinlik: IEtkinlik) => {
    setEtkinlikler([...etkinlikler, etkinlik]);
    setSeciliEtkinlik(etkinlik);
    setDuzenleModu(false);
  };

  const handleEtkinlikDuzenle = (etkinlik: IEtkinlik) => {
    setEtkinlikler([
      ...etkinlikler.filter(_etkinlik => _etkinlik.id !== etkinlik.id),
      etkinlik
    ]);
    setSeciliEtkinlik(etkinlik);
    setDuzenleModu(false);
  };

  const handleEtkinlikSil = (id: string) => {
    setEtkinlikler([...etkinlikler.filter(etkinlik => etkinlik.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IEtkinlik[]>("http://localhost:5000/api/etkinlikler")
      .then(response => {
        let etkinlikler: IEtkinlik[] = [];
        response.data.forEach(etkinlik => {
          etkinlik.tarih = etkinlik.tarih.split(".")[0];
          etkinlikler.push(etkinlik);
        });
        setEtkinlikler(etkinlikler);
      });
  }, []);

  return (
    <Fragment>
      <NavigationBar etkinlikOlusturmaFormu={handleEtkinlikOlusturmaFormu} />
      <Container style={{ marginTop: "7em" }}>
        <EtkinlikDashboard
          etkinlikler={etkinlikler}
          seciliEtkinlik={handleSeciliEtkinlik}
          secilenEtkinlik={seciliEtkinlik!}
          duzenleModu={duzenleModu}
          setDuzenleModu={setDuzenleModu}
          setSecilenEtkinlik={setSeciliEtkinlik}
          etkinlikOlustur={handleEtkinlikOlustur}
          etkinlikDuzenle={handleEtkinlikDuzenle}
          etkinlikSil={handleEtkinlikSil}
        />
      </Container>
    </Fragment>
  );
};

export default App;
