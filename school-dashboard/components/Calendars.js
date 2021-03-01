import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { CalendarContainerStyle } from './styles/CalendarStyles';
import DisplaySingleCalendarEvent from './DisplaySingleCalendarEvent';

const GET_CALENDARS = gql`
  query GET_CALENDARS($searchDates: String!) {
    allCalendars(sortBy: date_DESC, where: { date_gt: $searchDates }) {
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
  //   console.log(dates.label);
  //   console.log(dates.date);
  const { data, loading, error, refetch } = useQuery(GET_CALENDARS, {
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
