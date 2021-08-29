import gql from 'graphql-tag';
import BirthdaysTable from '../components/Birthdays/BirthdaysTable';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';

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

export default function BirthdayPage() {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    'AllBirthdays',
    ALL_BIRTHDAYS_QUERY,
    {},
    { enabled: !!me }
  );
  return (
    <div>
      <h1>Birthdays</h1>
      <BirthdaysTable birthdays={data?.allBirthdays} />
    </div>
  );
}
