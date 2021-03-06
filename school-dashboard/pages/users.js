import { gql } from 'graphql-request';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import GradientButton from '../components/styles/Button';
import Table from '../components/Table';
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
  const [userSortType, setUserSortType] = useState('student');
  const { data, isLoading, error } = useGQLQuery('users', GET_ALL_USERS);
  const columns = useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }) => (
              <Link href={`/userProfile/${row.original.id}`}>
                {row.original.name}
              </Link>
            ),
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
  // console.log(data);
  return (
    <div>
      <div>
        <GradientButton onClick={() => setUserSortType('teacher')}>
          Show Teachers
        </GradientButton>
        <GradientButton onClick={() => setUserSortType('student')}>
          Show Parents
        </GradientButton>
      </div>
      <Table
        data={data?.allUsers || []}
        columns={columns}
        searchColumn="name"
      />
    </div>
  );
}
