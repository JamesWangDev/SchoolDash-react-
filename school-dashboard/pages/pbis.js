import gql from 'graphql-tag';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import PbisFalcon from '../components/PBIS/PbisFalcon';
import DoughnutChart from '../components/Chart/DonutChart';
import DisplayPbisCollectionData from '../components/PBIS/DisplayPbisCollectionData';
import PbisCardChart from '../components/PBIS/PbisCardChart';

const ChartContainerStyles = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-evenly;
  align-items: center;
  @media print {
    display: none;
  }
`;

const AnnouncementStyle = styled.h2`
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  color: red;
  animation: color-change 3s infinite;
  @keyframes color-change {
    0% {
      color: var(--red);
    }
    50% {
      color: var(--blue);
    }
    100% {
      color: var(--red);
    }
  }
`;
export const TeamCardStyles = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around; */
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  page-break-before: always;

  div {
    text-align: center;
    padding: 5px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    h3 {
      color: var(--blue);
      text-shadow: 2px 2px var(--red);
    }
  }
`;

const PBIS_PAGE_QUERY = gql`
  query PBIS_PAGE_QUERY($teamId: ID, $countId: ID) {
    cards: allPbisCards {
      id
      dateGiven
      category
      teacher {
        id
        name
      }
      student {
        id
        name
      }
      counted
    }
    totalSchoolCards: _allPbisCardsMeta {
      count
    }
    totalTeamCards: _allPbisCardsMeta(
      where: { student: { taTeacher: { taTeam: { id: $countId } } } }
    ) {
      count
    }
    teams: allPbisTeams {
      id
      teamName
      taTeacher {
        id
        name
      }
      averageCardsPerStudent
      uncountedCards
      countedCards
      currentLevel
      numberOfStudents
    }
    lastCollection: allPbisCollections(sortBy: collectionDate_DESC, first: 2) {
      id
      name
      collectionDate
      personalLevelWinners
      randomDrawingWinners
      taTeamsLevels
      taTeamNewLevelWinners
      currentPbisTeamGoal
    }
    teamData: allPbisCards(
      where: { student: { taTeacher: { taTeam: { id: $teamId } } } }
    ) {
      id
      dateGiven
      category
      teacher {
        id
        name
      }
      student {
        id
        name
      }
      counted
    }
  }
`;

export default function Pbis() {
  const me = useUser();
  const teamId = me?.taTeam?.id || me?.taTeacher?.taTeam?.id || null;
  const teamName =
    me?.taTeam?.teamName || me?.taTeacher?.taTeam?.teamName || null;
  const { data, isLoading, error, refetch } = useGQLQuery(
    'PbisPageInfo',
    PBIS_PAGE_QUERY,
    {
      teamId,
      countId: teamId,
    },
    {
      enabled: !!me,
    }
  );
  if (isLoading) return <Loading />;
  const cards = data?.cards;
  const totalSchoolCards = data?.totalSchoolCards?.count;
  const totalTeamCards = data?.totalTeamCards?.count;
  const teams = data?.teams;
  const hasTeam = !!teamId;
  const lastPbisCollection = data?.lastCollection[0];
  const previousPbisCollection = data?.lastCollection[1];
  const newSchoelwideGoal = lastPbisCollection?.currentPbisTeamGoal || 2;
  const previousSchoelwideGoal =
    previousPbisCollection?.currentPbisTeamGoal || 2;
  const didWeGetNewSchoolWideLevel = newSchoelwideGoal > previousSchoelwideGoal;
  // get the possible categories for the cards
  const categories = cards?.map((card) => card.category);
  const categoriesSet = new Set(categories);
  const categoriesArray = Array.from(categoriesSet);
  // alpha sort the categories
  categoriesArray.sort();
  // get the number of cards in each category for whole school
  const schoolWideCardsInCategories = categoriesArray.map((category) => {
    const cardsInCategory = cards.filter((card) => card.category === category);
    return {
      word: category,
      total: cardsInCategory.length,
    };
  });
  // get the number of cards in each category for the team
  const teamWideCardsInCategories = categoriesArray.map((category) => {
    const cardsInCategory = data.teamData.filter(
      (card) => card.category === category
    );
    return {
      word: category,
      total: cardsInCategory.length,
    };
  });

  return (
    <div>
      <h1 className="hidePrint">School-Wide PBIS Data</h1>
      {/* <p>{JSON.stringify(data.teamData)}</p> */}
      <h2 className="hidePrint">School-Wide Cards: {totalSchoolCards}</h2>
      {hasTeam && (
        <h2 className="hidePrint">Total Team Cards: {totalTeamCards}</h2>
      )}
      <ChartContainerStyles className="hidePrint">
        <PbisFalcon className="hidePrint" />
        <DoughnutChart
          title="School-Wide Cards By Category"
          chartData={schoolWideCardsInCategories}
          className="hidePrint"
        />
        {hasTeam && (
          <DoughnutChart
            title={`${teamName} Cards By Category`}
            chartData={teamWideCardsInCategories}
          />
        )}
      </ChartContainerStyles>
      <PbisCardChart className="hidePrint" />
      <TeamCardStyles>
        {teams?.map((team) => (
          <div key={team.id}>
            <h3>{team.teamName}</h3>
            <p>
              {team.taTeacher.map((teacher) => (
                <span key={teacher.id}>{teacher.name}</span>
              ))}
            </p>
            <h4>Level -{team.currentLevel}-</h4>
            <p>{team.averageCardsPerStudent} cards per student</p>
            <p>Total of {team.numberOfStudents} students</p>
          </div>
        ))}
      </TeamCardStyles>
      <div>
        {didWeGetNewSchoolWideLevel && (
          <AnnouncementStyle>
            We Reached A New School-Wide Goal!!: {newSchoelwideGoal}
          </AnnouncementStyle>
        )}

        {lastPbisCollection && (
          <DisplayPbisCollectionData collectionData={lastPbisCollection} />
        )}
      </div>
      {/* {JSON.stringify(lastPbisCollection.taTeamsLevels)} */}
    </div>
  );
}
