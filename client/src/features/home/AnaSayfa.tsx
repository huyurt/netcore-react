import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const AnaSayfa = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, kullanici } = rootStore.kullaniciStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Uygulama
        </Header>
        {isLoggedIn && kullanici ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Hoşgeldin ${kullanici.displayName}`}
            />
            <Button as={Link} to="/etkinlikler" size="huge" inverted>
              Etkinliklere Git
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Uygulamaya Hoş Geldiniz" />
            <Button as={Link} to="/giris" size="huge" inverted>
              Giriş Yap
            </Button>
            <Button as={Link} to="/kayit" size="huge" inverted>
              Kaydol
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default AnaSayfa;
