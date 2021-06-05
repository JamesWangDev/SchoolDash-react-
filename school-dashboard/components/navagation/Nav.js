import Link from 'next/link';
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
          <Link href="/calendar">Calendar</Link>
          <Link href="/links">Links</Link>
          {isAllowed(me, 'TA Teacher') && <Link href="/ta">TA</Link>}
          {isAllowed(me, 'Classroom Teacher') && (
            <Link href="/callback">Callback</Link>
          )}
          {isAllowed(me, 'staff') && <Link href="/users">Users</Link>}
          {isAllowed(me, 'staff') && <Link href="/discipline">Discipline</Link>}
          {isAllowed(me, 'staff') && (
            <Link href="/studentFocus">Student Focus</Link>
          )}
          {/* <MessagesCount /> */}
        </>
      )}
    </NavStyles>
  );
}
