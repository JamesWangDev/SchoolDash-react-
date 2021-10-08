import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import NavStyles from '../styles/NavStyles';
import { useUser } from '../User';
import SignIn from '../loginComponents/SignIn';
import isAllowed from '../../lib/isAllowed';
import MessagesCount from '../Messages/MessagesCount';

export default function Nav() {
  const me = useUser();
  if (!me) {
    return <SignIn />;
  }
  return (
    <NavStyles>
      {true && (
        <>
          <Link href="/">
            <a className="home">
              <FaHome />
            </a>
          </Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/links">Links</Link>
          <Link href="/pbis">PBIS</Link>
          {isAllowed(me, 'hasTA') && <Link href="/ta">TA</Link>}
          {isAllowed(me, 'hasClasses') && (
            <Link href="/callback">Callback</Link>
          )}
          {isAllowed(me, 'isStaff') && <Link href="/users">Users</Link>}
          {isAllowed(me, 'isStaff') && (
            <Link href="/discipline">Discipline</Link>
          )}
          {isAllowed(me, 'isStaff') && (
            <Link href="/studentFocus">Student Focus</Link>
          )}
          {isAllowed(me, 'isSuperAdmin') && (
            <Link href="/superUserSettings">⚙️</Link>
          )}
          {isAllowed(me, 'canManagePbis') && <Link href="/birthdays">🧁</Link>}
        </>
      )}
    </NavStyles>
  );
}
