import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { CalendarContainerStyle } from './styles/CalendarStyles';
import DisplaySingleCalendarEvent from './DisplaySingleCalendarEvent';
import { useUser } from './User';
import NewCalendar from './NewCalendar';

export const GET_CALENDARS = gql`
  query GET_CALENDARS {
    allCalendars(sortBy: date_ASC) {
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
  const { data, loading, error } = useQuery(GET_CALENDARS, {});
  const filteredCalendars = data?.allCalendars.filter(
    (singleCalendarToFilter) => {
      // console.log(singleCalendarToFilter);
      const date = new Date(singleCalendarToFilter.date);
      const filterDate = new Date(dates.date);
      return date >= filterDate;
    }
  );

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
        {filteredCalendars.map((singleCalendar) => (
          <DisplaySingleCalendarEvent
            calendar={singleCalendar}
            key={singleCalendar.id}
          />
        ))}
      </CalendarContainerStyle>
    </>
  );
}
