import { SimpleForm, TextInput, required, Edit, ReferenceInput, BooleanInput } from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <ReferenceInput source="challengeId" reference="challenges"/>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" validate={[required()]} label="Correct" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
        <TextInput source="audioSrc" validate={[required()]} label="Audio" />
      </SimpleForm>
    </Edit>
  );
};
