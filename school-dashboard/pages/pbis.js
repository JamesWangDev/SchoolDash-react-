import gql from 'graphql-tag';
import Loading from '../components/Loading';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import PbisFalcon from '../components/PBIS/PbisFalcon';
import DoughnutChart from '../components/Chart/DonutChart';

const PBIS_PAGE_QUERY = gql`
  query PBIS_PAGE_QUERY {
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
    totalCards: _allPbisCardsMeta {
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
  }
`;

export default function Pbis() {
  const me = useUser();
  const { data, isLoading, error, refetch } = useGQLQuery(
    'PbisPageInfo',
    PBIS_PAGE_QUERY,
    {
      id: me?.id,
    },
    {
      enabled: !!me,
    }
  );
  if (isLoading) return <Loading />;
  const cards = data?.cards;
  const totalCards = data?.totalCards.count;
  const teams = data?.teams;

  // get the possible categories for the cards
  const categories = cards?.map((card) => card.category);
  const categoriesSet = new Set(categories);
  const categoriesArray = Array.from(categoriesSet);
  // alpha sort the categories
  categoriesArray.sort();
  // get the number of cards in each category
  const cardsInCategories = categoriesArray.map((category) => {
    const cardsInCategory = cards.filter((card) => card.category === category);
    return {
      word: category,
      total: cardsInCategory.length,
    };
  });

  return (
    <div>
      <h1>Schoolwide PBIS Data</h1>
      <PbisFalcon />
      <p>{JSON.stringify(cardsInCategories)}</p>
      <DoughnutChart title="Cards Categories" chartData={cardsInCategories} />
    </div>
  );
}
