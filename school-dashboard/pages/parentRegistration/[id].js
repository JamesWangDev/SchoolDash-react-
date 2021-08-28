import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';
import DisplayError from '../../components/ErrorMessage';
import Form, { FormContainerStyles } from '../../components/styles/Form';
import useForm from '../../lib/useForm';

// const GET_STUDENT_FOR_PARENT = gql`
//   query GET_STUDENT_FOR_PARENT($id: ID!) {
//     User(where: { id: $id }) {
//       id
//       name
//     }
//   }
// `;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $children: UserRelateToManyInput!
    $isParent: Boolean!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        password: $password
        isParent: $isParent
        children: $children
      }
    ) {
      id
      name
      email
    }
  }
`;

export default function SingleCallbackPage({ query }) {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
    children: { connect: { id: query.id } },
    isParent: true,
  });
  // const { data, isLoading, error } = useGQLQuery(
  //   `StudentForParent-${query.id}`,
  //   GET_STUDENT_FOR_PARENT,
  //   { id: query.id }
  // );

  const [createNewUser, { loading, data: newUser, error }] = useMutation(
    SIGNUP_MUTATION,
    {}
  );
  console.log(query.id);
  // if (isLoading) return <Loading />;
  // if (error) return <p>{error.message}</p>;
  // const student = data.User;
  console.log(error);
  return (
    <div>
      <FormContainerStyles>
        <Form
          className="visible"
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the inputfields to the backend:
            console.log(inputs);
            const res = await createNewUser({
              variables: {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                children: { connect: [{ id: query.id }] },
                isParent: true,
              },
            });

            console.log(res);
            //   setResultOfUpdate(
            //     JSON.parse(res.data.updateStudentSchedules.name)
            //   );
            //   // clearForm();
            //   setShowForm(false);
          }}
        >
          <h1>Register for a parent account for {query.name}</h1>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            {newUser?.createUser && (
              <p>
                Signed up with {newUser.createUser.email} - Please Go Sign in!
              </p>
            )}
            <label htmlFor="name">
              Name
              <input
                required
                // rows="25"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={inputs.data}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                required
                // rows="25"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={inputs.data}
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

            <button type="submit">Register</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
