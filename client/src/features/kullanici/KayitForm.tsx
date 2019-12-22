import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IKullaniciFormValues } from "../../app/models/kullanici";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  userName: isRequired("Kullanıcı Adınız"),
  displayName: isRequired("Adınız"),
  email: isRequired("Email"),
  sifre: isRequired("Şifre")
});

const KayitForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { kayit } = rootStore.kullaniciStore;
  return (
    <FinalForm
      onSubmit={(values: IKullaniciFormValues) =>
        kayit(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Etkinliklere Kaydol"
            color="teal"
            textAlign="center"
          />
          <Field
            name="userName"
            children={TextInput}
            placeholder="Kullanıcı Adınız"
          />
          <Field name="displayName" children={TextInput} placeholder="Adınız" />
          <Field name="email" children={TextInput} placeholder="Email" />
          <Field
            name="sifre"
            children={TextInput}
            placeholder="Şifre"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Kayıt Ol"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default KayitForm;
