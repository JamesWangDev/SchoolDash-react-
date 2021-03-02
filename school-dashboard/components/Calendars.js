import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { CalendarContainerStyle } from './styles/CalendarStyles';
import DisplaySingleCalendarEvent from './DisplaySingleCalendarEvent';
import { useUser } from './User';
import NewCalendar from './NewCalendar';

export const GET_CALENDARS = gql`
  query GET_CALENDARS($searchDates: String!) {
    allCalendars(sortBy: date_ASC, where: { date_gt: $searchDates }) {
      name
      id
      description
      date
      author {
        name
      }
      status
      dateCreated
      link
      linkTitle
    }
  }
`;

export default function Calendars({ dates }) {
  const user = useUser();
  const editor = user?.role?.some((role) => role.canManageCalendar);

  const { data, loading, error } = useQuery(GET_CALENDARS, {
    variables: {
      searchDates: dates.date,
    },
    pollInterval: 500,
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <NewCalendar hidden={!editor} />
      <CalendarContainerStyle>
        {data.allCalendars.map((singleCalendar) => (
          <DisplaySingleCalendarEvent
            calendar={singleCalendar}
            key={singleCalendar.id}
          />
        ))}
      </CalendarContainerStyle>
    </>
  );
}
