import AddBirthdays from '../components/Birthdays/AddBirthdays';
import NewWeeklyPbisCollection from '../components/PBIS/NewWeeklyPbisCollection';
// import StudentFocusTable from '../components/StudentFocusTable';
import { useUser } from '../components/User';
import NewStudent from '../components/users/CreateNewStudent';
import NewEvents from '../components/users/NewEvents';
import NewStaff from '../components/users/NewStaff';
import NewUpdateUsers from '../components/users/NewUpdateUsers';
import isAllowed from '../lib/isAllowed';

export default function SuperUserSettings() {
  const me = useUser();
  return (
    <div>
      <h1>Administration</h1>
      {isAllowed(me, 'isSuperAdmin') && <NewUpdateUsers />}
      {isAllowed(me, 'isSuperAdmin') && <NewStaff />}
      {isAllowed(me, 'isSuperAdmin') && <NewStudent />}
      {isAllowed(me, 'isSuperAdmin') && <NewEvents />}
      {isAllowed(me, 'isSuperAdmin') && <AddBirthdays />}
      {isAllowed(me, 'canManagePbis') && <NewWeeklyPbisCollection />}
    </div>
  );
}
