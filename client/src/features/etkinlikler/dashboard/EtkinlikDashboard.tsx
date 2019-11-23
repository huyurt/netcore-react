import React from "react";
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
  etkinlikSil: (id: string) => void;
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
  etkinlikSil
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EtkinlikListesi
          etkinlikler={etkinlikler}
          seciliEtkinlik={seciliEtkinlik}
          etkinlikSil={etkinlikSil}
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
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
