import React from 'react';
import { OneDayCalendarStyles } from '../styles/CalendarStyles';

function DisplayEvent({ event }) {
  const day = new Date(event.date).toLocaleDateString();
  return (
    <div>
      <p>{event.name}</p>
    </div>
  );
}

export default function SingleDayCalendar({ dailyEvents, day }) {
  const todaysDay = new Date().toLocaleString('en-us', { weekday: 'long' });
  return (
    <>
      <div className={todaysDay === day ? 'today' : 'notToday'}>
        <h2>{day}</h2>
        {dailyEvents.map((today) => (
          <DisplayEvent event={today} />
        ))}
      </div>
    </>
  );
}
