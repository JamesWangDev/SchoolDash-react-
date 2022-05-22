import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useQueryClient } from 'react-query';
import Form from '../styles/Form';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY, useUser } from '../User';
import Error from '../ErrorMessage';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { GraphQLClient, request } from 'graphql-request';
import { endpoint, prodEndpoint } from '../../config';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      __typename
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          name
          email
          id
        }
        sessionToken
        
      }
      ... on UserAuthenticationWithPasswordFailure {
   
        message
      }  
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const queryClient = useQueryClient();
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email: inputs.email.toLowerCase(),
      password: inputs.password,
    },
    // refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  // console.log(lowercaseEmail);
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    // console.log(inputs);
const newRes = await signinNew(inputs);
console.log("newSignin",newRes);
    const res = await signin();
    console.log("oldres",res);
    queryClient.refetchQueries();
    // refetch();
    resetForm();
    // Send the email and password to the graphqlAPI
  }
// console.log(data)
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <Error error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}



// const endpoint = "http://localhost:3000/api/graphql";

async function signinNew({ email, password }) {
const endppointToUse = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint

  const res = await request(endppointToUse, SIGNIN_MUTATION, {
    email: email.toLowerCase(),
    password,
    }, Headers);
  // console.log("signin",res);
  const token = res.authenticateUserWithPassword.sessionToken;
  // console.log("token",token);
  localStorage.setItem('token', token);
  return res.data;
}