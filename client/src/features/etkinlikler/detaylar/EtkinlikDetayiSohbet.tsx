import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { tr } from "date-fns/locale";

const EtkinlikDetayiSohbet = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    hubConnectionOlustur,
    hubConnectionDurdur,
    yorumEkle,
    etkinlik
  } = rootStore.etkinlikStore;

  useEffect(() => {
    hubConnectionOlustur();
    return () => {
      hubConnectionDurdur();
    };
  }, [hubConnectionOlustur, hubConnectionDurdur]);

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {etkinlik &&
            etkinlik.yorumlar &&
            etkinlik.yorumlar.map(yorum => (
              <Comment key={yorum.id}>
                <Comment.Avatar src={yorum.resim || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author
                    as={Link}
                    to={`/profil/${yorum.kullaniciAdi}`}
                  >
                    {yorum.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {formatDistance(yorum.tarih, new Date(), { locale: tr })}
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{yorum.icerik}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={yorumEkle}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  children={TextAreaInput}
                  rows={2}
                  placeholder="Yorumunuz..."
                />
                <Button
                  content="Yorum Ekle"
                  labelPosition="left"
                  icon="edit"
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(EtkinlikDetayiSohbet);
