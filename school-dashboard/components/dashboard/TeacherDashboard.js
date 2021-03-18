import WeeklyCalendar from '../calendars/WeeklyCalendar';
import HomePageLinks from '../navagation/HomePageLinks';
import PbisCardFormButton from '../PBIS/PbisCardFormButton';

export default function TeacherDashboard({ teacher }) {
  return (
    <div>
      <PbisCardFormButton teacher={teacher} />
    </div>
  );
}
