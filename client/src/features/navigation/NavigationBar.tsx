import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Ana Sayfa
        </Menu.Item>
        <Menu.Item name="Etkinlikler" as={NavLink} to="/etkinlikler" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/etkinlikOlustur"
            positive
            content="Etkinlik Oluştur"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavigationBar);
