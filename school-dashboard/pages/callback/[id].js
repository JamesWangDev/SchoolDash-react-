import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';

const GET_SINGLE_CALLBACK = gql`
  query GET_SINGLE_CALLBACK($id: ID!) {
    Callback(where: { id: $id }) {
      id
      description
    }
  }
`;

export default function SingleCallbackPage({ query }) {
  const { data, isLoading, error } = useGQLQuery(
    `SingleCallback-${query.id}`,
    GET_SINGLE_CALLBACK,
    { id: query.id }
  );
  if (isLoading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  const callback = data.Callback;
  return (
    <div>
      {/* <h1>{user.name}</h1> */}
      {/* <p>{JSON.stringify(user.role)}</p> */}
      <p>{query.id}</p>
      <p>{callback.description}</p>
    </div>
  );
}
