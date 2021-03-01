import { SingleCalendarStyle } from './styles/CalendarStyles';

export default function DisplaySingleCalendarEvent({ calendar }) {
  return (
    <SingleCalendarStyle>
      <h2>{calendar.name}</h2>
      <p>{Date(calendar.date).toString()}</p>
    </SingleCalendarStyle>
  );
}
