import Link from 'next/link';
import NavStyles from '../styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      {true && (
        <>
          <Link href="/calendar">Calendar</Link>
          <Link href="/Links">Links</Link>
          <Link href="/Finder">Finder</Link>
          <Link href="/Callback">Callback</Link>
          <Link href="/TaTeam">TA Team</Link>
          <Link href="/Discipline">Discipline</Link>
          <Link href="/StudentFocus">Student Focus</Link>
        </>
      )}
    </NavStyles>
  );
}
