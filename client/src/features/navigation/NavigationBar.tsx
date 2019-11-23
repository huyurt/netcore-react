import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  etkinlikOlusturmaFormu: () => void;
}

export const NavigationBar: React.FC<IProps> = ({ etkinlikOlusturmaFormu }) => {
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
            onClick={etkinlikOlusturmaFormu}
            positive
            content="Etkinlik Oluştur"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
