import Link from 'next/link';
import React, { useState } from 'react';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import { OneDayCalendarStyles } from '../styles/CalendarStyles';

function DisplayEvent({ event }) {
  const day = new Date(event.date).toLocaleDateString();
  const createdDate = new Date(event.date);
  const [displayDetails, setDisplayDetails] = useState(true);
  return (
    <div>
      <div>
        {/* <p>{event.name}</p> */}
        <GradientButton onClick={() => setDisplayDetails(!displayDetails)}>
          {displayDetails ? event.name : 'Hide Details'}
        </GradientButton>
      </div>
      <div className="detailsContainer">
        <div className="details" hidden={displayDetails}>
          <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {event.link ? (
              <Link
                href={
                  event.link.startsWith('http')
                    ? event.link
                    : `http://${event.link}`
                }
              >
                {event.linkTitle || 'Link'}
              </Link>
            ) : (
              ''
            )}
            <p>
              Created by: {event?.author?.name} on{' '}
              {createdDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
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
          <DisplayEvent key={today.id} event={today} />
        ))}
      </div>
    </>
  );
}
