import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IProfil } from "../../app/models/profil";

interface IProps {
  profil: IProfil;
}

const ProfilCard: React.FC<IProps> = ({ profil }) => {
  return (
    <Card as={Link} to={`/profile/${profil.userName}`}>
      <Image src={profil.resim || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profil.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name="user" />
          {profil.takipciSayisi} Takipçi
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfilCard;
