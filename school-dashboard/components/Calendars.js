import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { CalendarContainerStyle } from './styles/CalendarStyles';
import DisplaySingleCalendarEvent from './DisplaySingleCalendarEvent';

const GET_CALENDARS = gql`
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
    }
  }
`;

export default function Calendars({ dates }) {
  console.log(dates.label);
  const { data, loading, error, refetch } = useQuery(GET_CALENDARS, {
    variables: {
      searchDates: dates.date,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <CalendarContainerStyle>
      {data.allCalendars.map((singleCalendar) => (
        <DisplaySingleCalendarEvent
          calendar={singleCalendar}
          key={singleCalendar.id}
        />
      ))}
    </CalendarContainerStyle>
  );
}
