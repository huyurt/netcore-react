import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AnaSayfa = () => {
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
        <Header as="h2" inverted content="Uygulamaya Hoş Geldiniz" />
        <Button as={Link} to="/etkinlikler" size="huge" inverted>
          Etkinliklere Git
        </Button>
      </Container>
    </Segment>
  );
};

export default AnaSayfa;
