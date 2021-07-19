import gql from 'graphql-tag';
import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';
import LineChart from '../Chart/LineChart';
import Loading from '../Loading';

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
    <div>
      <p> chart</p>
      <LineChart chartData={dataToUse} />
      <p>{JSON.stringify(chartData)}</p>
    </div>
  );
}
