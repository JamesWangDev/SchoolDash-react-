import WeeklyCalendar from '../calendars/WeeklyCalendar';
import HomePageLinks from '../navagation/HomePageLinks';
import PbisCardFormButton from '../PBIS/PbisCardFormButton';
import TaCallbacks from '../Callback/TaCallback';
import Loading from '../Loading';
import TeacherAssignments from '../Assignments/TeacherAssignments';

export default function TeacherDashboard({ teacher }) {
  return (
    <div>
      <PbisCardFormButton teacher={teacher} />
      <TeacherAssignments />
      <TaCallbacks />
    </div>
  );
}
