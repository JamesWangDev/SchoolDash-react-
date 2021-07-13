import StudentFocusTable from '../components/StudentFocusTable';
import { useUser } from '../components/User';
import NewStaff from '../components/users/NewStaff';
import NewUpdateUsers from '../components/users/NewUpdateUsers';
import isAllowed from '../lib/isAllowed';

export default function superUserSettings() {
  const me = useUser();
  return (
    <div>
      <h1>Administration</h1>
      {isAllowed(me, 'isSuperAdmin') && <NewUpdateUsers />}
      {isAllowed(me, 'isSuperAdmin') && <NewStaff />}
    </div>
  );
}
