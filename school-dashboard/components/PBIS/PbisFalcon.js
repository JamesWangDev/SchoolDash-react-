import gql from 'graphql-tag';
import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisplayError from '../ErrorMessage';
import Loading from '../Loading';

// gql query to get number of cards
const TOTAL_PBIS_CARDS = gql`
  query {
    _allPbisCardsMeta {
      count
    }
  }
`;

export default function PbisFalcon() {
  const { data, isLoading, error } = useGQLQuery(
    'totalPbisCards',
    TOTAL_PBIS_CARDS
  );

  if (isLoading) return <Loading />;
  if (error) return <DisplayError error={error} />;
  const percentageFull = (data._allPbisCardsMeta.count / 34573) * 100;

  return (
    <div>
      <p>falcon goes here</p>
      <p>{data._allPbisCardsMeta.count}</p>
      <p>{percentageFull}%</p>
    </div>
  );
}
