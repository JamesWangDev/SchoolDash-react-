import gql from 'graphql-tag';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NewBullying from '../components/discipline/BullyingButton';
import Loading from '../components/Loading';
import Table from '../components/Table';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';

const BullyingPageContainer = styled.div`
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

const BULLYING_DATA_QUERY = gql`
  query BULLYING_DATA_QUERY {
    bullyings(orderBy: {dateReported:desc}) {
      id
      studentOffender {
        id
        name
      }
      teacherAuthor {
        id
        name
      }
      dateReported
    }
  }
`;

export default function Bullying() {
  const me = useUser();
  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allBullyings',
    BULLYING_DATA_QUERY
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Discipline',
        columns: [
          {
            Header: 'Student',
            accessor: 'studentOffender.name',
            Cell: ({ cell }) => (
              <Link href={`/hhb/${cell?.row?.original?.id || ''}`}>
                {cell.value}
              </Link>
            ),
          },
          {
            Header: 'Teacher',
            accessor: 'teacherAuthor.name',
            Cell: ({ cell }) => (
              <Link href={`/hhb/${cell?.row?.original?.id || ''}`}>
                {cell.value}
              </Link>
            ),
          },

          {
            Header: 'Date ',
            accessor: 'dateReported',
            Cell: ({ cell: { value } }) => {
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today 📆` : displayDate;
            },
          },
        ],
      },
    ],
    []
  );
  if (isLoading) return <Loading />;
  return (
    <BullyingPageContainer>
      <NewBullying refetch={refetch} />
      <h2>Hazing Harassment Bullying</h2>
      <Table
        className="big"
        columns={columns}
        data={data?.bullyings}
        searchColumn="studentOffender.name"
      />
    </BullyingPageContainer>
  );
}
