import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavigationBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { kullanici, logout } = rootStore.kullaniciStore;
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
        {kullanici && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={kullanici.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text="user">
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profil/${kullanici.userName}`}
                  text="Profilim"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavigationBar);
