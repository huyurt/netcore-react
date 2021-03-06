import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const EtkinlikDetayiBilgi: React.FC<{ etkinlik: IEtkinlik }> = ({
  etkinlik
}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{etkinlik.aciklama}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {format(etkinlik.tarih, "eeee dd MMMM", {locale: tr})} -{" "}
              {format(etkinlik.tarih, "HH:mm")}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {etkinlik.mekan}, {etkinlik.sehir}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EtkinlikDetayiBilgi;
