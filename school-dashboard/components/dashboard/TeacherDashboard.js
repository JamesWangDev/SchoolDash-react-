import WeeklyCalendar from '../calendars/WeeklyCalendar';
import HomePageLinks from '../navagation/HomePageLinks';
import PbisCardFormButton from '../PBIS/PbisCardFormButton';
import TaCallbacks from '../Callback/TaCallback';
import Loading from '../Loading';
import TeacherAssignments from '../Assignments/TeacherAssignments';
import { useUser } from '../User';
import isAllowed from '../../lib/isAllowed';

export default function TeacherDashboard({ teacher }) {
  const me = useUser();

  return (
    <div>
      <PbisCardFormButton teacher={teacher} />
      {isAllowed(me, 'Classroom Teacher') && <TeacherAssignments />}
      <TaCallbacks />
    </div>
  );
}
