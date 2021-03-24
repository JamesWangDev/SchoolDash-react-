import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Toggle from 'react-toggle';
import GradientButton from './styles/Button';
import Form, { FormContainerStyles } from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { useUser } from './User';
import 'react-toggle/style.css';

const CREATE_LINK_MUTATION = gql`
  mutation CREATE_LINK_MUTATION(
    $name: String!
    $description: String!
    $forTeachers: Boolean!
    $forStudents: Boolean!
    $forParents: Boolean!
    $onHomePage: Boolean!
    $link: String
    $modifiedBy: ID!
  ) {
    createLink(
      data: {
        name: $name
        description: $description
        forTeachers: $forTeachers
        forStudents: $forStudents
        forParents: $forParents
        onHomePage: $onHomePage
        link: $link
        modifiedBy: { connect: { id: $modifiedBy } }
      }
    ) {
      id
    }
  }
`;

export default function NewLink({ refetchLinks }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    forTeachers: false,
    forStudents: false,
    forParents: false,
    onHomePage: false,
  });
  const user = useUser();
  //   console.log(`user ${user.id}`);
  const [createLink, { loading, error, data }] = useMutation(
    CREATE_LINK_MUTATION,
    {
      variables: { ...inputs, modifiedBy: user?.id },
    }
  );
  console.log(inputs);
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm ? 'Close the form' : 'Add A New Link'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the inputfields to the backend:
            const res = await createLink();
            clearForm();
            refetchLinks();
            setShowForm(false);
          }}
        >
          <h1>Add a New Calendar Event</h1>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="name">
              Link Title
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="Link Title"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="link">
              Link
              <input
                type="text"
                id="link"
                name="link"
                placeholder="Input Link Here"
                value={inputs.link}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                required
                value={inputs.description}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="forTeachers">
              <span>Visible to Teachers </span>
              <Toggle
                checked={inputs.forTeachers}
                id="forTeachers"
                name="forTeachers"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="forStudents">
              <span>Visible to Students </span>
              <Toggle
                id="forStudents"
                name="forStudents"
                checked={inputs.forStudents}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="forParents">
              <span>Visible to Parents </span>
              <Toggle
                id="forParents"
                name="forParents"
                checked={inputs.forParents}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="onHomePage">
              <span>Show on The HomePage </span>
              <Toggle
                id="onHomePage"
                name="onHomePage"
                checked={inputs.onHomePage}
                onChange={handleChange}
              />
            </label>

            <button type="submit">+ Add A New Link</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
