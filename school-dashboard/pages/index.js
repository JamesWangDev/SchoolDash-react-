import Head from 'next/head';
import WeeklyCalendar from '../components/calendars/WeeklyCalendar';
import StudentCallbacks from '../components/Callback/StudentCallbacks';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import SignOut from '../components/loginComponents/SignOut';
import Header from '../components/navagation/Header';
import HomePageLinks from '../components/navagation/HomePageLinks';
import { CalendarContainerStyle } from '../components/styles/CalendarStyles';
import { useUser } from '../components/User';
import isAllowed from '../lib/isAllowed';
import styles from '../styles/Home.module.css';

export default function Home() {
  const me = useUser();
  return (
    <div>
      <main>
        <HomePageLinks me={me} />
        <CalendarContainerStyle>
          <WeeklyCalendar me={me} />
          {me?.role?.some((role) => role.name === 'staff') && (
            <TeacherDashboard teacher={me} />
          )}
          {me && isAllowed(me, 'student') && <StudentCallbacks />}
        </CalendarContainerStyle>
      </main>

      <footer>
        <SignOut />
      </footer>
    </div>
  );
}
