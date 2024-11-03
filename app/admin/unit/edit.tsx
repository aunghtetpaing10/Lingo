import { SimpleForm, TextInput, required, Edit, ReferenceInput, NumberInput } from "react-admin";

export const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="description" validate={[required()]} label="Description" />
        <ReferenceInput source="courseId" reference="courses" label="Course" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
