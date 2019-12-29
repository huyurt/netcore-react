import React, { useContext } from "react";
import { Segment, Item, Button, Image, Header } from "semantic-ui-react";
import { IEtkinlik } from "../../../app/models/etkinlik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { RootStoreContext } from "../../../app/stores/rootStore";

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EtkinlikDetayiBaslik: React.FC<{ etkinlik: IEtkinlik }> = ({
  etkinlik
}) => {
  const rootStore = useContext(RootStoreContext);
  const { etkinlikKatilim, katilimIptal, yukleniyor } = rootStore.etkinlikStore;
  const host = etkinlik.katilimcilar.filter(x => x.yayinlandiMi)[0];
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${etkinlik.kategori}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={etkinlik.baslik}
                  style={{ color: "white" }}
                />
                <p>{format(etkinlik.tarih, "eeee dd MMMM", { locale: tr })}</p>
                <p>
                  <Link to={`/profil/${host.kullaniciAdi}`}>
                    <strong>{host.displayName}</strong>
                  </Link>{" "}
                  tarafından paylaşıldı
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {etkinlik.yayinlandiMi ? (
          <Button
            as={Link}
            to={`/manage/${etkinlik.id}`}
            color="orange"
            floated="right"
          >
            Etkinliği Düzenle
          </Button>
        ) : etkinlik.gidiyorMu ? (
          <Button loading={yukleniyor} onClick={katilimIptal}>
            Etkinliğe Katılma
          </Button>
        ) : (
          <Button loading={yukleniyor} onClick={etkinlikKatilim} color="teal">
            Etkinliğe Katıl
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(EtkinlikDetayiBaslik);
