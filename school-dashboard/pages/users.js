import { gql } from 'graphql-request';
import { useMemo } from 'react';
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

const ArrayValues = ({ values }) => (
  <>
    {values.map((arrayValue, idx) => (
      <span key={idx} className="badge">
        {arrayValue.name}
      </span>
    ))}
  </>
);

export default function Users() {
  const { data, isLoading, error } = useGQLQuery('users', GET_ALL_USERS);
  const columns = useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Type',
            accessor: 'role',
            Cell: ({ cell: { value } }) => <ArrayValues values={value || []} />,
          },
          {
            Header: 'TA Teacher',
            accessor: 'taTeacher.name',
          },

          {
            Header: 'Callback',
            accessor: 'callbackCount',
          },
          {
            Header: 'Weekly PBIS',
            accessor: 'PbisCardCount',
          },
          {
            Header: 'Yearly PBIS',
            accessor: 'yearPbisCount',
          },
        ],
      },
    ],
    []
  );
  console.log(data);
  return (
    <div>
      <UserTable data={data?.allUsers || []} columns={columns} />
    </div>
  );
}
