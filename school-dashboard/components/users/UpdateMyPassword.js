import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import { useUser } from '../User';

const RESET_PASSWORD_TO_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_TO_PASSWORD_MUTATION($id: ID!, $password: String!) {
    updateUser(where: {id: $id}, data: { password: $password }) {
      id
    }
  }
`;

export default function UpdateMyPassword() {
  const me = useUser();
  const [showForm, setShowForm] = React.useState(false);
  const { inputs, handleChange, resetForm } = useForm({ newPassword: '' });
  const [resetThePassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD_TO_PASSWORD_MUTATION,
    {
      variables: {
        id: me?.id,
        password: inputs.newPassword,
      },
    }
  );

  return (
    <div>
      <GradientButton style={{}} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide  Update  Password  ' : 'Update My Password'}
      </GradientButton>
      <div style={{ position: 'relative', marginTop: '-320px' }}>
        <FormContainerStyles>
          <Form
            className={showForm ? 'visible' : 'hidden'}
            onSubmit={async (e) => {
              e.preventDefault();
              // Submit the inputfields to the backend:
              const res = await resetThePassword();
              resetForm();
              setShowForm(false);
            }}
          >
            <h1>Update My Password</h1>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="newPassword">
                New Password
                <input
                  required
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Your New Password"
                  value={inputs.newPassword}
                  onChange={handleChange}
                />
              </label>

              <button type="submit">update Data</button>
            </fieldset>
          </Form>
        </FormContainerStyles>
      </div>
    </div>
  );
}
