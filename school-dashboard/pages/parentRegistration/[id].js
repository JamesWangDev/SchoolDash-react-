import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';

const GET_STUDENT_FOR_PARENT = gql`
  query GET_STUDENT_FOR_PARENT($id: ID!) {
    User(where: { id: $id }) {
      id
      name
    }
  }
`;

export default function SingleCallbackPage({ query }) {
  const { data, isLoading, error } = useGQLQuery(
    `StudentForParent-${query.id}`,
    GET_STUDENT_FOR_PARENT,
    { id: query.id }
  );
  if (isLoading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  const student = data.User;
  return (
    <div>
      <h1>Register for a parent account for {student.name}</h1>
    </div>
  );
}
