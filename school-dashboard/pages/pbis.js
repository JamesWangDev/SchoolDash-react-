import gql from 'graphql-tag';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import PbisFalcon from '../components/PBIS/PbisFalcon';
import DoughnutChart from '../components/Chart/DonutChart';
import DisplayPbisCollectionData from '../components/PBIS/DisplayPbisCollectionData';

const ChartContainerStyles = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-evenly;
  align-items: center;
`;
export const TeamCardStyles = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  div {
    text-align: center;
    padding: 5px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
      <h1>School-Wide PBIS Data</h1>
      {/* <p>{JSON.stringify(data.teamData)}</p> */}
      <h2>School-Wide Cards: {totalSchoolCards}</h2>
      {hasTeam && <h2>Total Team Cards: {totalTeamCards}</h2>}
      <ChartContainerStyles>
        <PbisFalcon />
        <DoughnutChart
          title="School-Wide Cards By Category"
          chartData={schoolWideCardsInCategories}
        />
        {hasTeam && (
          <DoughnutChart
            title={`${teamName} Cards By Category`}
            chartData={teamWideCardsInCategories}
          />
        )}
      </ChartContainerStyles>
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
        {lastPbisCollection && (
          <DisplayPbisCollectionData collectionData={lastPbisCollection} />
        )}
      </div>
    </div>
  );
}
