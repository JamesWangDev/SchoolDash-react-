import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';

import { useUser } from '../User';

const UPDATE_LINK_MUTATION = gql`
  mutation UPDATE_LINK_MUTATION(
    $id: ID!
    $name: String!
    $description: String
    $link: String
  ) {
    updateLink(
      id: $id
      data: { name: $name, description: $description, link: $link }
    ) {
      id
    }
  }
`;

export default function EditLink({ link, refetch }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: link.name,
    description: link.description,
    link: link.link,
  });
  const user = useUser();

  const [updateLink, { loading, error, data }] = useMutation(
    UPDATE_LINK_MUTATION,
    {
      variables: {
        ...inputs,
        id: link.id,
      },
    }
  );

  return (
    <div>
      <SmallGradientButton onClick={() => setShowForm(!showForm)}>
        {showForm ? 'close' : 'Edit Link'}
      </SmallGradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          style={{ width: '500px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await updateLink();

            refetch();
            setShowForm(false);
            // console.log(inputs);
          }}
        >
          <h2>Edit Link</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <FormGroupStyles> */}
            <label htmlFor="name">
              Name
              <input
                style={{ marginLeft: '0' }}
                required
                type="text"
                id="name"
                name="name"
                placeholder="Title of Assignment"
                value={inputs.name || ''}
                onChange={handleChange}
              />
            </label>
            {/* </FormGroupStyles> */}
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Assignment Description"
                required
                value={inputs.description}
                onChange={handleChange}
                rows="5"
              />
            </label>
            <label htmlFor="link">
              Link
              <input
                style={{ marginLeft: '0' }}
                id="link"
                name="link"
                placeholder="Link to website"
                value={inputs.link}
                onChange={handleChange}
              />
            </label>
            <button type="submit">+ Publish</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
