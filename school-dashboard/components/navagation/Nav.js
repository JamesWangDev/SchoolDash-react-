import Link from 'next/link';
import NavStyles from '../styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      {true && (
        <>
          <Link href="/calendar">Calendar</Link>
          <Link href="/links">Links</Link>
          <Link href="/ta">TA</Link>
          <Link href="/callback">Callback</Link>
          <Link href="/users">Users</Link>
          <Link href="/discipline">Discipline</Link>
          <Link href="/studentFocus">Student Focus</Link>
        </>
      )}
    </NavStyles>
  );
}
