import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { WeeklyCalendarContainerStyles } from '../styles/CalendarStyles';
import { useUser } from '../User';
import SingleDayCalendar from './SingleDayCalendar';
import Loading from '../Loading';

export const GET_WEEK_CALENDARS = gql`
  query GET_WEEK_CALENDARS($starting: DateTime, $ending: DateTime) {
    calendars(
      orderBy: {date: asc}
      where: {AND:[ {date: {gte: $starting}}, {date: {lte: $ending}}] }
    ) {
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

export function getLastAndNextSunday(d) {
  const lastSunday = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() - d.getDay()
  );
  const nextSunday = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + (7 - d.getDay())
  );
  // console.log(d, lastSunday, nextSunday);
  const l = new Date(d);
  l.setDate(l.getDate() - l.getDay());
  const n = new Date(d);
  n.setDate(n.getDate() + ((5 - n.getDay() + 7) % 7) + 1);
  return {
    lastSunday: lastSunday.toISOString(),
    nextSaturday: nextSunday.toISOString(),
  };
}

function getDatesFromDayOfTheWeek(data, day) {
  const dates = data?.filter((date) => {
    const d = new Date(date.date);
    return d.getDay() === day;
  });
  return dates;
}

export default function WeeklyCalendar({ initialData }) {
  const today = new Date();
  const me = useUser();
  // const status = me.isStaff ? 'Teachers' : 'Students';
  const todaysDay = today.getDay();
  const { lastSunday, nextSaturday } = getLastAndNextSunday(today);
  const { data, isLoading, error } = useGQLQuery(
    'weekCalendars',
    GET_WEEK_CALENDARS,
    {
      starting: lastSunday,
      ending: nextSaturday,
    },
    {
      initialData,
      staleTime: 1000 * 60 * 3, // 3 minutes
    }
  );
  if (!me) return <p />;
  // if (isLoading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  // filter calendars by who can see them
  const filteredCalendars = data?.calendars?.filter((calendar) => {
    if (calendar.status === 'Both') return true;
    if (calendar.status === 'Teachers' && me.isStaff) return true;
    if (calendar.status === 'Students' && me.isStudent) return true;
    if (calendar.status === 'Students' && me.isParent) return true;
    return false;
  });

  const dailyEvents = {
    sundayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 0),
    mondayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 1),
    tuesdayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 2),
    wednesdayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 3),
    thursdayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 4),
    fridayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 5),
    saturdayEvents: getDatesFromDayOfTheWeek(filteredCalendars, 6),
  };
  return (
    <WeeklyCalendarContainerStyles>
      <SingleDayCalendar dailyEvents={dailyEvents.sundayEvents} day="Sunday" />
      <SingleDayCalendar dailyEvents={dailyEvents.mondayEvents} day="Monday" />
      <SingleDayCalendar
        dailyEvents={dailyEvents.tuesdayEvents}
        day="Tuesday"
        className={todaysDay === 2 ? 'today' : ''}
      />
      <SingleDayCalendar
        dailyEvents={dailyEvents.wednesdayEvents}
        day="Wednesday"
      />
      <SingleDayCalendar
        dailyEvents={dailyEvents.thursdayEvents}
        day="Thursday"
      />
      <SingleDayCalendar dailyEvents={dailyEvents.fridayEvents} day="Friday" />
      <SingleDayCalendar
        dailyEvents={dailyEvents.saturdayEvents}
        day="Saturday"
      />
    </WeeklyCalendarContainerStyles>
  );
}
