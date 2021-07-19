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
`;

const CARD_COLLECTION_DATA_FOR_CHART_QUERY = gql`
  query CARD_COLLECTION_DATA_FOR_CHART_QUERY {
    cardCounts: allPbisCollections {
      id
      name
      collectedCards
    }
  }
`;

export default function PbisCardChart() {
  const { data, isLoading } = useGQLQuery(
    'PbisChartData',
    CARD_COLLECTION_DATA_FOR_CHART_QUERY
  );
  if (isLoading) return <Loading />;
  const chartDataRaw = data?.cardCounts;
  //   console.log(chartDataRaw);
  // parse the data array into Json object
  const chartData = chartDataRaw.map((singleCollection) => ({
    name: singleCollection.name,
    collectionData: JSON.parse(singleCollection.collectedCards),
  }));
  const dataToUse = chartData.map((singleCollection) => ({
    item: singleCollection.name,
    // Get total of each collection count
    data:
      singleCollection?.collectionData?.reduce(
        (acc, curr) => acc + curr.count,
        0
      ) || 0,
  }));
  //   console.log(dataToUse);
  return (
    <LineChartStyles>
      <LineChart title="Cards Collected Per Week" chartData={dataToUse} />
    </LineChartStyles>
  );
}
