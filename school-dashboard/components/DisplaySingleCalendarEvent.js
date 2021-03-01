import { useState } from 'react';
import Link from 'next/link';
import { SmallGradientButton } from './styles/Button';
import { SingleCalendarStyle } from './styles/CalendarStyles';

export default function DisplaySingleCalendarEvent({ calendar }) {
  const [displayDetails, setDisplayDetails] = useState(true);
  const date = new Date(calendar.date);
  const createdDate = new Date(calendar.dateCreated).toLocaleDateString();
  const today = new Date();
  const isToday = date.toLocaleDateString() === today.toLocaleDateString();
  return (
    <SingleCalendarStyle>
      <div className="title">
        <h2>
          <span style={{ color: 'var(--red)' }} hidden={!isToday}>
            Today 📆{' '}
          </span>
          {calendar.name}
        </h2>
        <h4>{date.toDateString()}</h4>
        <SmallGradientButton onClick={() => setDisplayDetails(!displayDetails)}>
          {displayDetails ? 'Details' : 'Hide Details'}
        </SmallGradientButton>
      </div>
      <div className="detailsContainer">
        <div className="details" hidden={displayDetails}>
          <div>
            <p>{calendar.description}</p>
            {calendar.link ? (
              <Link
                href={
                  calendar.link.startsWith('http')
                    ? calendar.link
                    : `http://${calendar.link}`
                }
              >
                {calendar.linkTitle || 'Link'}
              </Link>
            ) : (
              ''
            )}
            <p>
              Created by: {calendar.author.name} on {createdDate}
            </p>
          </div>
        </div>
      </div>
    </SingleCalendarStyle>
  );
}
