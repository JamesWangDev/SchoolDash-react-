import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
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

const ContainerStyles = styled.div`
  height: 150px;
  width: 150px;
  background-color: var(--red);
  border-radius: 50;
  margin: 50;
  /* border-radius: 1rem; */

  .filler {
    width: 100%;
    height: ${({ percentageFull }) => 100 - percentageFull * 200}%;
    background-color: var(--blue);
    position: relative;
    bottom: 0px;
    transition: width 1s ease-in-out;
    text-align: right;
    /* border-radius: 1rem 1rem 0rem 0rem; */
  }

  .label {
    padding: 5;
    color: white;
    font-weight: bold;
  }
  img {
    position: relative;
    top: 0px;
    width: 100%;
    height: 100%;
  }
`;

export default function PbisFalcon() {
  const { data, isLoading, error } = useGQLQuery(
    'totalPbisCards',
    TOTAL_PBIS_CARDS
  );

  if (isLoading) return <Loading />;
  if (error) return <DisplayError error={error} />;
  const percentageFull =
    Math.round((data._allPbisCardsMeta.count / 34573) * 10000) / 100;

  return (
    <div>
      <ContainerStyles percentageFull={percentageFull}>
        <div className="filler">
          <img src="/falcon.svg" />
          <span className="label">{`${percentageFull}%`}</span>
        </div>
      </ContainerStyles>

      <p>falcon goes here</p>
      <p>{data._allPbisCardsMeta.count}</p>
      <p>{percentageFull}%</p>
    </div>
  );
}
