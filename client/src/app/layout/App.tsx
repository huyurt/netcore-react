import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IEtkinlik } from "../models/etkinlik";
import { NavigationBar } from "../../features/navigation/NavigationBar";
import { EtkinlikDashboard } from "../../features/etkinlikler/dashboard/EtkinlikDashboard";
import agent from "../api/agent";
import { LoadingIndicator } from "./LoadingIndicator";

const App: React.FC = () => {
  const [etkinlikler, setEtkinlikler] = useState<IEtkinlik[]>([]);
  const [seciliEtkinlik, setSeciliEtkinlik] = useState<IEtkinlik | null>(null);
  const [duzenleModu, setDuzenleModu] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSeciliEtkinlik = (id: string) => {
    setSeciliEtkinlik(etkinlikler.filter(etkinlik => etkinlik.id === id)[0]);
    setDuzenleModu(false);
  };

  const handleEtkinlikOlusturmaFormu = () => {
    setSeciliEtkinlik(null);
    setDuzenleModu(true);
  };

  const handleEtkinlikOlustur = (etkinlik: IEtkinlik) => {
    setSubmitting(true);
    agent.Etkinlikler.olustur(etkinlik)
      .then(() => {
        setEtkinlikler([...etkinlikler, etkinlik]);
        setSeciliEtkinlik(etkinlik);
        setDuzenleModu(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEtkinlikDuzenle = (etkinlik: IEtkinlik) => {
    setSubmitting(true);
    agent.Etkinlikler.guncelle(etkinlik)
      .then(() => {
        setEtkinlikler([
          ...etkinlikler.filter(_etkinlik => _etkinlik.id !== etkinlik.id),
          etkinlik
        ]);
        setSeciliEtkinlik(etkinlik);
        setDuzenleModu(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEtkinlikSil = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Etkinlikler.sil(id)
      .then(() => {
        setEtkinlikler([...etkinlikler.filter(etkinlik => etkinlik.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Etkinlikler.list()
      .then(response => {
        let etkinlikler: IEtkinlik[] = [];
        response.forEach(etkinlik => {
          etkinlik.tarih = etkinlik.tarih.split(".")[0];
          etkinlikler.push(etkinlik);
        });
        setEtkinlikler(etkinlikler);
      })
      .then(() => setYukleniyor(false));
  }, []);

  if (yukleniyor)
    return <LoadingIndicator content="Etkinlikler yükleniyor..." />;

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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
