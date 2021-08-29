import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { WeeklyCalendarContainerStyles } from '../styles/CalendarStyles';
import { useUser } from '../User';
import SingleDayCalendar from './SingleDayCalendar';
import Loading from '../Loading';

export const GET_WEEK_CALENDARS = gql`
  query GET_WEEK_CALENDARS(
    $starting: String
    $ending: String
    $status: String
  ) {
    allCalendars(
      sortBy: date_ASC
      where: {
        date_gte: $starting
        date_lte: $ending
        OR: [{ status: $status }, { status: "Both" }]
      }
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

function getLastAndNextSunday(d) {
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
    lastSunday: lastSunday.toISOString().slice(0, -14),
    nextSaturday: nextSunday.toISOString().slice(0, -14),
  };
}

function getDatesFromDayOfTheWeek(data, day) {
  const dates = data.filter((date) => {
    const d = new Date(date.date);
    return d.getDay() === day;
  });
  return dates;
}

export default function WeeklyCalendar() {
  const today = new Date();
  const me = useUser();
  const status = me.isStaff ? 'Teachers' : 'Students';
  const todaysDay = today.getDay();
  const { lastSunday, nextSaturday } = getLastAndNextSunday(today);
  const { data, isLoading, error } = useGQLQuery(
    'weekCalendars',
    GET_WEEK_CALENDARS,
    {
      starting: lastSunday,
      ending: nextSaturday,

      status,
    }
  );
  if (!me) return <p />;
  if (isLoading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  const dailyEvents = {
    sundayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 0),
    mondayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 1),
    tuesdayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 2),
    wednesdayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 3),
    thursdayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 4),
    fridayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 5),
    saturdayEvents: getDatesFromDayOfTheWeek(data.allCalendars, 6),
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
