import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import { GraphQLClient } from "graphql-request";
import { useUser } from "../components/User";
import { useGQLQuery } from "../lib/useGqlQuery";
import PbisFalcon from "../components/PBIS/PbisFalcon";
import DoughnutChart from "../components/Chart/DonutChart";
import DisplayPbisCollectionData from "../components/PBIS/DisplayPbisCollectionData";
import PbisCardChart from "../components/PBIS/PbisCardChart";
import GradientButton, {
  SmallGradientButton,
} from "../components/styles/Button";
import isAllowed from "../lib/isAllowed";
import { endpoint, prodEndpoint } from "../config";

const ChartContainerStyles = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(3, minmax(150px, 350px));

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
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  page-break-before: always;
  width: 100%;
  div {
    page-break-inside: avoid;
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
const TitleBarStyles = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
  width: 100%;
  .pbisLinks {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    button {
      margin: 5px;
    }
  }
`;

const PBIS_PAGE_QUERY = gql`
  query PBIS_PAGE_QUERY($teamId: ID) {
    totalTeamCards: pbisCardsCount(
      where: { student: { taTeacher: { taTeam: { id: { equals: $teamId } } } } }
    )

    teamData: pbisCards(
      where: { student: { taTeacher: { taTeam: { id: { equals: $teamId } } } } }
    ) {
      id
      dateGiven
      category
      counted
    }
  }
`;

const PBIS_PAGE_STATIC_QUERY = gql`
  query PBIS_PAGE_STATIC_QUERY {
    cards: pbisCards(take: 1000, orderBy: { dateGiven: desc }) {
      id
      dateGiven
      category

      counted
    }
    totalSchoolCards: pbisCardsCount

    teams: pbisTeams {
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
    lastCollection: pbisCollections(
      orderBy: { collectionDate: desc }
      take: 2
    ) {
      id
      name
      collectionDate
      personalLevelWinners
      randomDrawingWinners
      taTeamsLevels
      taTeamNewLevelWinners
      currentPbisTeamGoal
    }

    pbisLinks: links(where: { forPbis: { equals: true } }) {
      id
      link
      name
      description
      forParents
      forTeachers
      forStudents
    }
    cardCounts: pbisCollections(orderBy: { collectionDate: asc }) {
      id
      name
      collectedCards
    }
  }
`;

export default function Pbis(props) {
  // console.log(props.data);
  const me = useUser();
  const teamId = me?.taTeam?.id || me?.taTeacher?.taTeam?.id || null;
  const teamName =
    me?.taTeam?.teamName || me?.taTeacher?.taTeam?.teamName || null;
  const { data, isLoading, error, refetch } = useGQLQuery(
    "PbisPageInfo",
    PBIS_PAGE_QUERY,
    {
      teamId,
      // countId: teamId,
      forTeachers: me?.isStaff || null,
      forStudents: me?.isStudent || null,
      forParents: me?.isParent || null,
    },
    {
      enabled: !!me && !!teamId,
    }
  );
  // if (isLoading) return <Loading />;
  // const cards = data?.cards;
  const totalSchoolCards = props?.totalSchoolCards || data?.totalSchoolCards;
  const schoolWideCardsInCategories =
    props?.schoolWideCardsInCategories || data?.schoolWideCardsInCategories;
  const teams = props?.teams || [];
  const hasTeam = !!teamId;
  const categoriesArray = props?.categoriesArray || [];
  const lastPbisCollection = props?.lastPbisCollection || null;
  const previousPbisCollection = props?.previousPbisCollection || null;
  const rawListOfLinks = props?.pbisLinks || [];
  const newSchoolwideGoal = lastPbisCollection?.currentPbisTeamGoal || 2;
  const previousSchoolwideGoal =
    previousPbisCollection?.currentPbisTeamGoal || 2;
  const didWeGetNewSchoolWideLevel = newSchoolwideGoal > previousSchoolwideGoal;
  const cardCounts = props?.cardCounts;
  const totalTeamCards = data?.totalTeamCards;

  // get the number of cards in each category for the team
  const teamWideCardsInCategories =
    categoriesArray?.map((category) => {
      const cardsInCategory = data?.teamData?.filter(
        (card) => card.category === category
      );
      return {
        word: category,
        total: cardsInCategory?.length,
      };
    }) || [];

  // filter raw links to only show links for the user's role
  const links = rawListOfLinks?.filter((link) => {
    if (link.forParents && me?.isParent) return link;
    if (link.forTeachers && me?.isStaff) return link;
    if (link.forStudents && me?.isStudent) return link;
    return null;
  });

  return (
    <div>
      <TitleBarStyles>
        {/* {JSON.stringify(rawListOfLinks)} */}
        <div>
          <h1 className="hidePrint">School-Wide PBIS Data</h1>
          {/* <p>{JSON.stringify(data.teamData)}</p> */}
          <h2 className="hidePrint">School-Wide Cards: {totalSchoolCards}</h2>
          {hasTeam && (
            <h2 className="hidePrint">
              Total Team Cards: {totalTeamCards || "loading..."}
            </h2>
          )}
        </div>
        <div>
          <h2 className="hidePrint">Links</h2>
          <div className="pbisLinks">
            {isAllowed(me, "canManagePbis") && (
              <>
                <Link to="/PbisWeeklyReading" href="/PbisWeeklyReading">
                  <SmallGradientButton title="Weekly Reading">
                    Weekly Reading
                  </SmallGradientButton>
                </Link>
                <Link to="/PbisDataTable" href="/PbisDataTable">
                  <SmallGradientButton title="Data Table">
                    Data Table
                  </SmallGradientButton>
                </Link>
              </>
            )}
            {isAllowed(me, "isStaff") && (
              <Link to="/studentsOfInterestPBIS" href="/studentsOfInterestPBIS">
                <GradientButton title="Students of Interest">
                  Students of Interest
                </GradientButton>
              </Link>
            )}
            {links?.map((link) => (
              <Link
                key={link.id}
                to={link.link}
                className="pbis-link"
                target="_blank"
                href={
                  link.link.startsWith("http")
                    ? link.link
                    : `http://${link.link}`
                }
              >
                <SmallGradientButton title={link.description}>
                  <h3 className="pbis-link-title">{link.name}</h3>
                </SmallGradientButton>
              </Link>
            ))}
          </div>
        </div>
      </TitleBarStyles>
      <ChartContainerStyles className="hidePrint">
        {me && <PbisFalcon initialCount={totalSchoolCards} />}
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
      <PbisCardChart className="hidePrint" cardCounts={cardCounts} />
      <TeamCardStyles>
        {teams?.map((team) => (
          <div key={team.id} className="gridCard">
            <h3>{team.teamName}</h3>

            {team.taTeacher?.map((teacher) => (
              <p key={teacher.id}>{` ${teacher.name} `} </p>
            ))}

            <h4>Level -{team.currentLevel}-</h4>
            <p>{team.averageCardsPerStudent} cards per student</p>
            <p>Total of {team.numberOfStudents} students</p>
          </div>
        ))}
      </TeamCardStyles>
      <div>
        {didWeGetNewSchoolWideLevel && (
          <AnnouncementStyle>
            We Reached A New School-Wide Goal!!: {newSchoolwideGoal}
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

export async function getStaticProps(context) {
  console.log("PBIS PAGE GET STATIC PROPS");
  // fetch PBIS Page data from the server
  const headers = {
    credentials: "include",
    mode: "cors",
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    headers
  );
  // console.log(GraphQLClient);
  const fetchData = async () => graphQLClient.request(PBIS_PAGE_STATIC_QUERY);
  const data = await fetchData();
  // console.log(data);
  const cards = data?.cards || [];
  const totalSchoolCards = data?.totalSchoolCards || 0;

  // gat card data by category
  const categories = cards?.map((card) => card.category) || [];
  const categoriesSet = new Set(categories);
  const categoriesArray = Array.from(categoriesSet);
  // alpha sort the categories
  categoriesArray.sort();
  // get the number of cards in each category for whole school
  const schoolWideCardsInCategories =
    categoriesArray?.map((category) => {
      const cardsInCategory = cards.filter(
        (card) => card.category === category
      );
      return {
        word: category,
        total: cardsInCategory.length,
      };
    }) || [];

  const teams = data?.teams || [];

  const lastPbisCollection = data?.lastCollection[0] || null;
  const previousPbisCollection = data?.lastCollection[1] || null;
  const pbisLinks = data?.pbisLinks || [];
  const cardCounts = data?.cardCounts || [];

  return {
    props: {
      totalSchoolCards,
      schoolWideCardsInCategories,
      categoriesArray,
      teams,
      lastPbisCollection,
      previousPbisCollection,
      pbisLinks,
      cardCounts,
    }, // will be passed to the page component as props
    revalidate: false,
  };
}
