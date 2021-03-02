import Head from 'next/head';
import WeeklyCalendar from '../components/calendars/WeeklyCalendar';
import SignOut from '../components/loginComponents/SignOut';
import Header from '../components/navagation/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <main>
        <WeeklyCalendar />
      </main>

      <footer>
        <SignOut />
      </footer>
    </div>
  );
}
