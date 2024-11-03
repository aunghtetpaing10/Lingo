import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceInput,
  SelectInput,
} from "react-admin";

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <ReferenceInput source="lessonId" reference="lessons" label="Lesson" />
        <SelectInput
          source="type"
          validate={[required()]}
          label="Type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
        />
        <TextInput source="question" validate={[required()]} label="Question" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
