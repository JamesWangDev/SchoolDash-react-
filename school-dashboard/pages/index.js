import Head from 'next/head';
import WeeklyCalendar from '../components/calendars/WeeklyCalendar';
import SignOut from '../components/loginComponents/SignOut';
import Header from '../components/navagation/Header';
import HomePageLinks from '../components/navagation/HomePageLinks';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <main>
        <HomePageLinks />
        <WeeklyCalendar />
      </main>

      <footer>
        <SignOut />
      </footer>
    </div>
  );
}
