import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import EtkinlikStore from "../../app/stores/EtkinlikStore";
import { observer } from "mobx-react-lite";

const NavigationBar: React.FC = () => {
  const etkinlikStore = useContext(EtkinlikStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Uygulama
        </Menu.Item>
        <Menu.Item name="Etkinlikler" />
        <Menu.Item>
          <Button
            onClick={etkinlikStore.etkinlikOlusturmaFormu}
            positive
            content="Etkinlik Oluştur"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavigationBar);
