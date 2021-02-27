import gql from 'graphql-tag';
import { SingleCalendarStyle } from '../components/styles/CalendarStyles';
import { useGQLQuery } from '../lib/useGqlQuery';

const GET_CALENDARS = gql`
  query {
    allCalendars {
      name
      id
    }
  }
`;

export default function calendar() {
  const { data, isLoading, error } = useGQLQuery('calendars', GET_CALENDARS);
  console.log(data, isLoading, error);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      {data.allCalendars.map((calendar) => (
        <SingleCalendarStyle key={calendar.id}>
          <p>{calendar.name}</p>
        </SingleCalendarStyle>
      ))}
    </div>
  );
}
