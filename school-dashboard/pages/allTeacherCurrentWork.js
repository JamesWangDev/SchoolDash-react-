import gql from 'graphql-tag';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NewBullying from '../components/discipline/BullyingButton';
import Loading from '../components/Loading';
import Table from '../components/Table';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';

const TeacherWorkPageContainer = styled.div`
  h2 {
    text-align: center;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
  div {
    max-width: 500px;
  }
  .big {
    flex-basis: 100%;

    width: 1000px;
    /* background-color: red; */
  }
`;

const ALL_TEACHERS_QUERY = gql`
  query BULLYING_DATA_QUERY {
    allUsers(where: { hasClasses: true }, sortBy: name_DESC) {
      id
      name
      block1ClassName
      block1Assignment
      block1AssignmentLastUpdated
      block2ClassName
      block2Assignment
      block2AssignmentLastUpdated
      block3ClassName
      block3Assignment
      block3AssignmentLastUpdated
      block4ClassName
      block4Assignment
      block4AssignmentLastUpdated
      block5ClassName
      block5Assignment
      block5AssignmentLastUpdated
    }
  }
`;

export default function AllTeacherCurrentWork() {
  const me = useUser();
  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allTeachers',
    ALL_TEACHERS_QUERY
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Teacher',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ cell }) => (
              <Link href={`/userProfile/${cell?.row?.original?.id || ''}`}>
                {cell.value}
              </Link>
            ),
          },
          {
            Header: 'Block 1',
            accessor: 'block1Assignment',
            Cell: ({ cell }) => <div>{cell.value}</div>,
          },
          {
            Header: 'Block 2',
            accessor: 'block2Assignment',
            Cell: ({ cell }) => <div>{cell.value}</div>,
          },
          {
            Header: 'Block 3',
            accessor: 'block3Assignment',
            Cell: ({ cell }) => <div>{cell.value}</div>,
          },
          {
            Header: 'Block 4',
            accessor: 'block4Assignment',
            Cell: ({ cell }) => <div>{cell.value}</div>,
          },
          {
            Header: 'Block 5',
            accessor: 'block5Assignment',
            Cell: ({ cell }) => <div>{cell.value}</div>,
          },
        ],
      },
    ],
    []
  );
  if (isLoading) return <Loading />;
  return (
    <TeacherWorkPageContainer>
      <h1>All Teachers Current Work</h1>
      <Table
        data={data?.allUsers || []}
        columns={columns}
        searchColumn="name"
      />
    </TeacherWorkPageContainer>
  );
}
