import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IKullaniciEtkinlik } from "../../app/models/profil";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
import { tr } from "date-fns/locale";

const panes = [
  { menuItem: "Gelecek Etkinlikler", pane: { key: "futureEvents" } },
  { menuItem: "Geçmiş Etkinlikler", pane: { key: "pastEvents" } },
  { menuItem: "Güncel Etkinlikler", pane: { key: "hosted" } }
];

const ProfilEtkinlikler = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    kullaniciEtkinlikleriniYukle,
    profil,
    etkinliklerYukleniyor,
    kullaniciEtkinlikleri
  } = rootStore.profilStore!;

  useEffect(() => {
    kullaniciEtkinlikleriniYukle(profil!.userName);
  }, [kullaniciEtkinlikleriniYukle, profil]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = "past";
        break;
      case 2:
        predicate = "hosting";
        break;
      default:
        predicate = "future";
        break;
    }
    kullaniciEtkinlikleriniYukle(profil!.userName, predicate);
  };

  return (
    <Tab.Pane loading={etkinliklerYukleniyor}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Etkinlikler"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {kullaniciEtkinlikleri.map((activity: IKullaniciEtkinlik) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.kategori}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">
                    {activity.baslik}
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {format(new Date(activity.tarih), "do LLL", {
                        locale: tr
                      })}
                    </div>
                    <div>
                      {format(new Date(activity.tarih), "h:mm a", {
                        locale: tr
                      })}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilEtkinlikler);
