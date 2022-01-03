import gql from 'graphql-tag';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { capitalizeFirstLetter } from '../lib/nameUtils';
import { useGQLQuery } from '../lib/useGqlQuery';

const PbisReadingStyles = styled.div`
  h3 {
    font-size: 2.5rem;
  }
  p {
    font-size: 2rem;
  }
  ul {
    font-size: 2rem;
  }
  .strong {
    font-size: 3rem;
  }
  max-width: 100rem;
  margin: 0 auto;
`;

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
  // console.log('PbisWeeklyReading');

  const { data, isLoading } = useGQLQuery(
    'PBIS Reading Page',
    PBIS_READING_QUERY,
    {},
    {}
  );
  if (isLoading) return <Loading />;
  const lastCollection = data.lastCollection[0];
  const taTeamsAtNewLevels =
    JSON.parse(lastCollection?.taTeamNewLevelWinners) || [];
  // console.log(taTeamsAtNewLevels);
  const personalLevelWinners =
    JSON.parse(lastCollection?.personalLevelWinners) || [];
  const randomDrawingWinners =
    JSON.parse(lastCollection?.randomDrawingWinners) || [];
  const hasTaTeamsAtNewLevels = taTeamsAtNewLevels.length > 0;
  const hasPersonalLevelWinners = personalLevelWinners.length > 0;
  const hasRandomDrawingWinners = randomDrawingWinners.length > 0;

  const totalCards = data.totalCards.count;
  return (
    <PbisReadingStyles>
      <h3>In PBIS News,</h3>
      <p>
        As a school, we have earned {totalCards} PBIS cards. Keep up the good
        work. Continue to demonstrate our Habits of Work: Respect,
        Responsibility, and Perseverance.
      </p>
      {hasTaTeamsAtNewLevels && (
        <h3>The following TA Teams have reached a new level:</h3>
      )}
      <ul>
        {taTeamsAtNewLevels.map((winner) => (
          <li key={winner.id}>{winner.name}</li>
        ))}
      </ul>
      <h3>
        <span className="strong">Congratulations</span> to the following Random
        Drawing Winners! Please report to the gym to claim your reward.
      </h3>
      <ul>
        {randomDrawingWinners.map((winner) => (
          <li key={winner.id}>
            {capitalizeFirstLetter(winner?.randomWinner?.name)}
          </li>
        ))}
      </ul>
      {hasPersonalLevelWinners && (
        <h3>
          The following students have Leveled-Up and should report to the gym to
          claim their reward.
        </h3>
      )}
      <ul>
        {personalLevelWinners.map((winner) => (
          <li key={winner.id}>{capitalizeFirstLetter(winner.name)}</li>
        ))}
      </ul>
    </PbisReadingStyles>
  );
}
