import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { useState } from 'react';
import GradientButton from './styles/Button';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) 
  }
`;

export default function RequestReset() {
  const [isSent, setIsSent] = useState(false);
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: inputs.email.toLowerCase(),
      },
      // refectch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    if(res?.data?.sendUserPasswordResetLink) setIsSent(true);
    // resetForm();
    // Send the email and password to the graphqlAPI
  }


  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <Error error={error} />
      <fieldset>
        {isSent && (
          <p>Success! Check {inputs.email} for a link!</p>
        )}

       {!isSent && 
       <>
       <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
            required
            
            />
        </label>
        <GradientButton type="submit" disabled={isSent} aria-disabled={isSent}>{isSent ? "sent" :"Request Reset!"}</GradientButton>
            </>
        }
      </fieldset>
    </Form>
  );
}
