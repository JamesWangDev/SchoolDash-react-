import { useState } from 'react';
import { SmallGradientButton } from './styles/Button';
import { SingleCalendarStyle } from './styles/CalendarStyles';

export default function DisplaySingleCalendarEvent({ calendar }) {
  const [displayDetails, setDisplayDetails] = useState(true);
  const date = new Date(calendar.date);
  return (
    <SingleCalendarStyle>
      <div className="title">
        <h2>{calendar.name}</h2>
        <h4>{date.toDateString()}</h4>
        <SmallGradientButton onClick={() => setDisplayDetails(!displayDetails)}>
          {displayDetails ? 'Details' : 'Hide Details'}
        </SmallGradientButton>
      </div>
      <div className="detailsContainer">
        <div className="details" hidden={displayDetails}>
          <div>
            <p>{calendar.description}</p>
            <p>Created by: {calendar.author.name}</p>
          </div>
        </div>
      </div>
    </SingleCalendarStyle>
  );
}
