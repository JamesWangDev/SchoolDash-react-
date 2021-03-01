import { useState } from 'react';
import styled from 'styled-components';
import Calendars from '../components/Calendars';
import { LeftEdgeButton } from '../components/styles/Button';

export default function Calendar() {
  const [calendarDates, setCalendarDates] = useState({
    date: '2011-10-05T14:48:00.000Z',
    label: 'all',
  });
  function switchDates() {
    if (calendarDates.label === 'all') {
      const weekAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      setCalendarDates({ label: 'upcoming', date: weekAgo });
    } else {
      setCalendarDates({ label: 'all', date: '2011-02-28T20:48:00.000Z' });
    }
  }

  return (
    <div>
      <div>
        <LeftEdgeButton onClick={() => switchDates()}>
          <div className="vertical">
            {calendarDates.label === 'all'
              ? 'Show Upcoming Dates Only'
              : 'Show All Dates'}
          </div>
        </LeftEdgeButton>
      </div>
      <Calendars dates={calendarDates} />
    </div>
  );
}
