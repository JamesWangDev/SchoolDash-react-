import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useQueryClient } from 'react-query';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';

import { useUser } from '../User';
import useRevalidatePage from '../../lib/useRevalidatePage';

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
const DELETE_LINK_MUTATION = gql`
  mutation DELETE_LINK_MUTATION($id: ID!) {
    deleteLink(where:{id: $id}) {
      id
    }
  }
`;

export default function EditLink({ link, refetch }) {
  const revalidateIndex = useRevalidatePage('/');
  const revalidateLinksPage = useRevalidatePage('/links');
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: link.name,
    description: link.description,
    link: link.link,
  });
  const user = useUser();

  const [updateLink, { loading, error }] = useMutation(UPDATE_LINK_MUTATION, {
    variables: {
      ...inputs,
      id: link.id,
    },
  });
  const [
    deleteLink,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_LINK_MUTATION, {
    variables: {
      id: link.id,
    },
  });
  const queryClient = useQueryClient();
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
            revalidateIndex();
            revalidateLinksPage();
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
            <button
              type="button"
              onClick={async () => {
                const res = await deleteLink();
                // console.log(res);
                revalidateIndex();
                revalidateLinksPage();
                queryClient.refetchQueries('allLinks');
              }}
            >
              Delete
            </button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
