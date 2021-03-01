import { useState } from 'react';
import Calendars from '../components/Calendars';
import GradientButton from '../components/styles/Button';

export default function Calendar() {
  const [calendarDates, setCalendarDates] = useState({
    date: '2011-10-05T14:48:00.000Z',
    label: 'all',
  });
  function switchDates() {
    if (calendarDates.label === 'all') {
      setCalendarDates({ label: 'upcoming', date: '2021-10-05T14:48:00.000Z' });
    } else {
      setCalendarDates({ label: 'all', date: '2011-02-28T20:48:00.000Z' });
    }
  }

  function setStartingDate(dates) {
    if (dates === 'upcoming') {
      console.log('upcoming');
      // const today = new Date();

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      console.log(weekAgo);
      return weekAgo.toISOString();
    }
    return '2011-10-05T14:48:00.000Z';
  }
  return (
    <div>
      <div>
        <GradientButton onClick={() => switchDates()}>
          {calendarDates.label === 'all'
            ? 'Show Upcoming Dates Only'
            : 'Show All Dates'}
        </GradientButton>
      </div>
      <Calendars dates={calendarDates} />
    </div>
  );
}
