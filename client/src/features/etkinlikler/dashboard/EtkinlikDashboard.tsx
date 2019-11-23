import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { EtkinlikListesi } from "./EtkinlikListesi";
import { EtkinlikDetaylari } from "../detaylar/EtkinlikDetaylari";
import { EtkinlikForm } from "../form/EtkinlikForm";

interface IProps {
  etkinlikler: IEtkinlik[];
  seciliEtkinlik: (id: string) => void;
  secilenEtkinlik: IEtkinlik | null;
  duzenleModu: boolean;
  setDuzenleModu: (duzenleModu: boolean) => void;
  setSecilenEtkinlik: (etkinlik: IEtkinlik | null) => void;
  etkinlikOlustur: (etkinlik: IEtkinlik) => void;
  etkinlikDuzenle: (etkinlik: IEtkinlik) => void;
  etkinlikSil: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const EtkinlikDashboard: React.FC<IProps> = ({
  etkinlikler,
  seciliEtkinlik,
  secilenEtkinlik,
  duzenleModu,
  setDuzenleModu,
  setSecilenEtkinlik,
  etkinlikOlustur,
  etkinlikDuzenle,
  etkinlikSil,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EtkinlikListesi
          etkinlikler={etkinlikler}
          seciliEtkinlik={seciliEtkinlik}
          etkinlikSil={etkinlikSil}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {secilenEtkinlik && !duzenleModu && (
          <EtkinlikDetaylari
            etkinlik={secilenEtkinlik}
            setDuzenleModu={setDuzenleModu}
            setSecilenEtkinlik={setSecilenEtkinlik}
          />
        )}
        {duzenleModu && (
          <EtkinlikForm
            key={(secilenEtkinlik && secilenEtkinlik.id) || 0}
            setDuzenleModu={setDuzenleModu}
            etkinlik={secilenEtkinlik!}
            etkinlikOlustur={etkinlikOlustur}
            etkinlikDuzenle={etkinlikDuzenle}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
