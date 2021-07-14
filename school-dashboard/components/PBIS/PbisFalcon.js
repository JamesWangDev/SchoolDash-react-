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
  margin: 0.5rem;
  /* border-radius: 1rem; */

  .filler {
    width: 100%;
    height: ${({ percentageLeft }) => percentageLeft}%;
    background-color: var(--blue);
    position: relative;
    bottom: 0px;
    transition: width 1s ease-in-out;
    text-align: right;
    /* border-radius: 1rem 1rem 0rem 0rem; */
  }

  .label {
    position: absolute;
    /* padding: 5; */
    color: white;
    font-weight: bold;
    left: 20px;
    right: 20px;
    text-align: center;
  }
  .total {
    position: absolute;
    /* padding: 5; */
    color: white;
    font-weight: bold;
    left: 20px;
    right: 20px;
    bottom: 50px;
    text-align: center;
  }
  img {
    position: absolute;
    top: 2px;
    left: 5%;
    width: 90%;
    /* height: 100%; */
  }
`;

export default function PbisFalcon() {
  const { data, isLoading, error } = useGQLQuery(
    'totalPbisCards',
    TOTAL_PBIS_CARDS
  );
  const cardGoal = 35000;

  if (isLoading) return <Loading />;
  if (error) return <DisplayError error={error} />;
  const percentageFull =
    Math.round((data._allPbisCardsMeta.count / cardGoal) * 10000) / 100;
  const percentageLeft = 100 - percentageFull;
  return (
    <div>
      <ContainerStyles percentageLeft={percentageLeft}>
        <div className="filler">
          <img src="/falcon.svg" alt="falcon" />
          <span className="label">{`${percentageFull}%`}</span>
          <span className="total">{data._allPbisCardsMeta.count} cards</span>
        </div>
      </ContainerStyles>
    </div>
  );
}
