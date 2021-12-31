import gql from 'graphql-tag';
import { GraphQLClient } from 'graphql-request';
import BirthdaysTable from '../components/Birthdays/BirthdaysTable';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import { endpoint, prodEndpoint } from '../config';

const ALL_BIRTHDAYS_QUERY = gql`
  query ALL_BIRTHDAYS_QUERY {
    allBirthdays {
      id
      cakeType
      date
      hasChosen
      hasDelivered
      student {
        id
        name
        taTeacher {
          id
          name
        }
      }
    }
  }
`;

export default function BirthdayPage(props) {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    'AllBirthdays',
    ALL_BIRTHDAYS_QUERY,
    {},
    {
      enabled: !!me,
      initialData: props?.initialBirthdays,
      staleTime: 1000 * 60 * 3,
    }
  );
  return (
    <div>
      <h1>Birthdays</h1>
      <BirthdaysTable birthdays={data?.allBirthdays} />
    </div>
  );
}

export async function getStaticProps(context) {
  // console.log(context);

  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  const fetchBirthdayData = async () =>
    graphQLClient.request(ALL_BIRTHDAYS_QUERY);

  const initialBirthdays = await fetchBirthdayData();

  return {
    props: {
      initialBirthdays,
    }, // will be passed to the page component as props
  };
}
