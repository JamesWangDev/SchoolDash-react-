import gql from 'graphql-tag';
import Loading from '../components/Loading';
import { useGQLQuery } from '../lib/useGqlQuery';

const PBIS_READING_QUERY = gql`
  query PBIS_READING_QUERY {
    lastCollection: allPbisCollections(sortBy: collectionDate_DESC, first: 1) {
      id
      name
      collectionDate
      personalLevelWinners
      randomDrawingWinners
      taTeamsLevels
      taTeamNewLevelWinners
      currentPbisTeamGoal
    }
    totalCards: _allPbisCardsMeta {
      count
    }
  }
`;

export default function PbisWeeklyReading() {
  console.log('PbisWeeklyReading');

  const { data, isLoading } = useGQLQuery(
    'PBIS Reading Page',
    PBIS_READING_QUERY,
    {},
    {}
  );
  console.log('data', data);
  if (isLoading) return <Loading />;

  const totalCards = data.totalCards.count;
  return (
    <div>
      <h1>In PBIS News,</h1>
      <h2>
        As a school, we have earned {totalCards} PBIS cards. Keep up the good
        work. Continue to demonstrate our Habits of Work: Respect,
        Responsibility, and Perseverance.
      </h2>
    </div>
  );
}
