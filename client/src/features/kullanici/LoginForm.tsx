import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IKullaniciFormValues } from "../../app/models/kullanici";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("email"),
  sifre: isRequired("sifre")
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
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form>
          <Field name="email" children={TextInput} placeholder="Email" />
          <Field
            name="sifre"
            children={TextInput}
            placeholder="Şifre"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <Label color="red" basic content={submitError.statusText} />
          )}
          <br />
          <Button
            disabled={invalid && !dirtySinceLastSubmit || pristine}
            loading={submitting}
            positive
            content="Giriş"
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
