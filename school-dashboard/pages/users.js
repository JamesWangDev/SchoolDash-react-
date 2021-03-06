import { gql } from 'graphql-request';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import DisplayError from '../components/ErrorMessage';
import GradientButton from '../components/styles/Button';
import Table from '../components/Table';
import { useGQLQuery } from '../lib/useGqlQuery';

const GET_ALL_USERS = gql`
  query GET_ALL_USERS($searchTerm: String) {
    allUsers(where: { role_some: { name: $searchTerm } }) {
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

const ButtonStyles = styled.div`
  /* background: red; */

  button {
    border: 2px solid white;
    position: absolute;
    :hover {
      border: 2px solid var(--red);
    }
  }
  .hide {
    opacity: 0;
    visibility: hidden;
  }
  .show {
    opacity: 1;
  }
  padding-bottom: 3.5rem;
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
  const { data, isLoading, error, refetch } = useGQLQuery(
    'users',
    GET_ALL_USERS,
    {
      searchTerm: userSortType,
    }
  );
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

  useEffect(() => refetch(), [userSortType]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <DisplayError>{error.mesage}</DisplayError>;
  return (
    <div>
      <ButtonStyles>
        <GradientButton
          onClick={() => {
            setUserSortType('staff');
          }}
          className={userSortType === 'staff' ? 'hide' : 'show'}
        >
          Show Teachers
        </GradientButton>
        <GradientButton
          onClick={() => {
            setUserSortType('student');
          }}
          className={userSortType === 'student' ? 'hide' : 'show'}
        >
          Show Students
        </GradientButton>
      </ButtonStyles>
      <Table
        data={data?.allUsers || []}
        columns={columns}
        searchColumn="name"
      />
    </div>
  );
}
