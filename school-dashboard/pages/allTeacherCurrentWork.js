import gql from 'graphql-tag';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';
import NewBullying from '../components/discipline/BullyingButton';
import Loading from '../components/Loading';
import Table from '../components/Table';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import { endpoint, prodEndpoint } from '../config';

const TeacherWorkPageContainer = styled.div`
  h2 {
    text-align: center;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
  div {
    max-width: 100%;
  }
  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
  }
`;

const ALL_TEACHERS_QUERY = gql`
  query BULLYING_DATA_QUERY {
    allUsers(where: { hasClasses: true }, sortBy: name_ASC) {
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

function DisplayClasswork({ data, block }) {
  // console.log(data);
  if (data) {
    const classname = data[`block${block}ClassName`];
    const assignment = data[`block${block}Assignment`];
    const lastUpdated = data[`block${block}AssignmentLastUpdated`];
    const daysSinceLastUpdated = Math.floor(
      (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
    );
    const wasUpdatedInLastYear = daysSinceLastUpdated < 365;

    return (
      <div>
        {wasUpdatedInLastYear ? (
          <>
            <h3>
              <strong>{classname}</strong>
            </h3>
            <p>
              <strong>{assignment}</strong>
            </p>
            <p>
              <strong>Updated {daysSinceLastUpdated} days ago</strong>
            </p>
          </>
        ) : (
          <h3>Not Updated</h3>
        )}
      </div>
    );
  }
}

export default function AllTeacherCurrentWork(props) {
  const me = useUser();

  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allTeachers',
    ALL_TEACHERS_QUERY,
    {},
    {
      staleTime: 1000 * 60 * 3,
      initialData: props?.initialWorkData,
    }
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
            Cell: ({ row }) => (
              <DisplayClasswork data={row.original} block="1" />
            ),
          },
          {
            Header: 'Block 2',
            accessor: 'block2Assignment',
            Cell: ({ row }) => (
              <DisplayClasswork data={row.original} block="2" />
            ),
          },
          {
            Header: 'Block 3',
            accessor: 'block3Assignment',
            Cell: ({ row }) => (
              <DisplayClasswork data={row.original} block="3" />
            ),
          },
          {
            Header: 'Block 4',
            accessor: 'block4Assignment',
            Cell: ({ row }) => (
              <DisplayClasswork data={row.original} block="4" />
            ),
          },
          {
            Header: 'Block 5',
            accessor: 'block5Assignment',
            Cell: ({ row }) => (
              <DisplayClasswork data={row.original} block="5" />
            ),
          },
        ],
      },
    ],
    []
  );
  // if (isLoading) return <Loading />;
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

export async function getStaticProps(context) {
  // console.log(context);
  // fetch PBIS Page data from the server
  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  const fetchTeacherWork = async () =>
    graphQLClient.request(ALL_TEACHERS_QUERY);

  const initialWorkData = await fetchTeacherWork();

  return {
    props: {
      initialWorkData,
    }, // will be passed to the page component as props
    // revalidate: 60 * 60, // 1 hour in seconds
  };
}
