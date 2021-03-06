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
  email: isRequired("Email"),
  sifre: isRequired("Şifre")
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.kullaniciStore;
  return (
    <FinalForm
      onSubmit={(values: IKullaniciFormValues) =>
        login(values).catch(error => ({
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
            content="Etkinliklere Giriş Yap"
            color="teal"
            textAlign="center"
          />
          <Field name="email" children={TextInput} placeholder="Email" />
          <Field
            name="sifre"
            children={TextInput}
            placeholder="Şifre"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text="Hatalı email veya şifre"
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Giriş"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
