import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { ResimUploadWidget } from "../../app/common/resimUpload/ResimUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilResmi = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profil,
    isCurrentUser,
    uploadResim,
    resimYukleniyor,
    setAnaResim,
    resimSil,
    yukleniyor
  } = rootStore.profilStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );
  const handleUploadResim = (resim: Blob) => {
    uploadResim(resim).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header icon="image" content="Resimler" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "İptal" : "Resmi Ekle"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <ResimUploadWidget
              uploadResim={handleUploadResim}
              yukleniyor={resimYukleniyor}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profil &&
                profil.resimler.map(resim => (
                  <Card key={resim.id}>
                    <Image src={resim.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          onClick={e => {
                            setAnaResim(resim);
                            setTarget(e.currentTarget.name);
                          }}
                          name={resim.id}
                          disabled={resim.anaResimMi}
                          loading={yukleniyor && target === resim.id}
                          basic
                          positive
                          content="Ana Resim"
                        />
                        <Button
                          name={resim.id}
                          disabled={resim.anaResimMi}
                          onClick={e => {
                            resimSil(resim);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          loading={yukleniyor && deleteTarget === resim.id}
                          basic
                          negative
                          icon="trash"
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilResmi);
