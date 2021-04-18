import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';

const GET_SINGLE_USER = gql`
  query GET_SINGLE_USER($id: ID!) {
    User(where: { id: $id }) {
      id
      name
      email
      taStudents {
        id
        name
      }
      role {
        name
        hasTA
        hasClasses
      }
    }
  }
`;

export default function UserProfile({ query }) {
  const { data, isLoading, error } = useGQLQuery(
    `SingleUser-${query.id}`,
    GET_SINGLE_USER,
    { id: query.id }
  );
  if (isLoading) return <p>... Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const user = data.User;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{JSON.stringify(user.role)}</p>
      <p>{query.id}</p>
      <p>{user.email}</p>
    </div>
  );
}
