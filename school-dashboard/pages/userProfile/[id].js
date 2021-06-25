import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';
import { useUser } from '../../components/User';
import isAllowed from '../../lib/isAllowed';
import ViewTeacherPage from '../../components/users/ViewTeacherPage';
import ViewStudentPage from '../../components/users/ViewStudentPage';
import ViewParentPage from '../../components/users/ViewParentPage';

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
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    `SingleUser-${query.id}`,
    GET_SINGLE_USER,
    { id: query.id }
  );
  if (isLoading || !me) return <Loading />;
  if (error) return <p>{error.message}</p>;
  if (!isAllowed(me, 'staff')) return null;
  const user = data.User;
  return (
    <div>
      <h1>{user.name}</h1>
      {isAllowed(user, 'staff') && <ViewTeacherPage teacher={user} />}
      {isAllowed(user, 'student') && <ViewStudentPage student={user} />}
      {isAllowed(user, 'parent') && <ViewParentPage parent={user} />}
    </div>
  );
}
