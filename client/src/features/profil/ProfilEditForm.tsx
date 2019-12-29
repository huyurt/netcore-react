import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { observer } from "mobx-react-lite";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { IProfil } from "../../app/models/profil";

const validate = combineValidators({
  displayName: isRequired("displayName")
});

interface IProps {
  profilGuncelle: (profile: Partial<IProfil>) => void;
  profil: IProfil;
}

const ProfilEditForm: React.FC<IProps> = ({ profilGuncelle, profil }) => {
  return (
    <FinalForm
      onSubmit={profilGuncelle}
      validate={validate}
      initialValues={profil!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            children={TextInput}
            placeholder="Display Name"
            value={profil!.displayName}
          />
          <Field
            name="bio"
            children={TextAreaInput}
            rows={3}
            placeholder="Bio"
            value={profil!.bio}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Profili Güncelle"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfilEditForm);
