import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import LineChart from '../Chart/LineChart';
import Loading from '../Loading';

const LineChartStyles = styled.div`
  /* position: relative; */
  width: 90%;
  height: 300px;
  margin: 10px auto;
  padding: 0;
  /* background-color: var(y); */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  @media print {
    display: none;
  }
`;

const CARD_COLLECTION_DATA_FOR_CHART_QUERY = gql`
  query CARD_COLLECTION_DATA_FOR_CHART_QUERY {
    cardCounts: pbisCollections (orderBy:{collectionDate:asc}) {
      id
      name
      collectedCards
    }
  }
`;

export default function PbisCardChart(initialData) {
  const { data, isLoading } = useGQLQuery(
    'PbisChartData',
    CARD_COLLECTION_DATA_FOR_CHART_QUERY,
    {},
    {
      initialData,
      staleTime: 1000 * 60 * 3, // 3 minutes
    }
  );

  // if (isLoading) return <Loading />;
  const chartDataRaw = data?.cardCounts;
  //   console.log(chartDataRaw);
  // parse the data array into Json object
  const chartData = chartDataRaw?.map((singleCollection) => ({
    name: singleCollection.name,
    collectionData: singleCollection.collectedCards,
  }));
  const dataToUse = chartData?.map((singleCollection) => ({
    item: singleCollection.name,
    // Get total of each collection count
    data: Number(singleCollection.collectionData),
  }));
  //   console.log(dataToUse);
  return (
    <LineChartStyles>
      <LineChart
        title="Marbles Per Week"
        chartData={dataToUse}
        label="Marbles Per Week"
      />
    </LineChartStyles>
  );
}
