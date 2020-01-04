import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IKatilimci } from "../../../app/models/etkinlik";

interface IProps {
  katilimcilar: IKatilimci[];
}

const styles = {
  borderColor: "orange",
  borderWidth: 2
};

const EtkinlikListItemKatilimcilar: React.FC<IProps> = ({ katilimcilar }) => {
  return (
    <List horizontal>
      {katilimcilar.map(katilimci => (
        <List.Item key={katilimci.kullaniciAdi}>
          <Popup
            header={katilimci.displayName}
            trigger={
              <Image
                size="mini"
                circular
                src={katilimci.resim || "/assets/user.png"}
                bordered
                style={katilimci.takipEdilen ? styles : null}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default EtkinlikListItemKatilimcilar;
