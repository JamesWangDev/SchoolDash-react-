import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import NewBullying from '../components/discipline/BullyingButton';
import Loading from '../components/Loading';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';

const BullyingPageContainer = styled.div`
  h2 {
    text-align: center;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
    allBullyings {
      id
    }
  }
`;

export default function Bullying() {
  const me = useUser();
  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allDisciplines',
    BULLYING_DATA_QUERY
  );
  if (isLoading) return <Loading />;
  return (
    <BullyingPageContainer>
      <NewBullying refetch={refetch} />
      <h2>Hazing Harassment Bullying</h2>
      <p>{JSON.stringify(data, null, 2)}</p>
    </BullyingPageContainer>
  );
}
