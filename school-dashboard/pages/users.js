import { gql } from 'graphql-request';
import UserTable from '../components/UserTable';
import { useGQLQuery } from '../lib/useGqlQuery';

const GET_ALL_USERS = gql`
  query GET_ALL_USERS {
    allUsers {
      id
      name
      role {
        name
      }
      taTeacher {
        name
      }
      callbackCount
      PbisCardCount
      YearPbisCount
    }
  }
`;

export default function Users() {
  const { data, isLoading, error } = useGQLQuery('users', GET_ALL_USERS);
  console.log(data);
  return (
    <div>
      <UserTable users={data.allUsers} />
    </div>
  );
}
