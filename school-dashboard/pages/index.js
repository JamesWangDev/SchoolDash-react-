import Head from 'next/head';
import styled from 'styled-components';
import WeeklyCalendar from '../components/calendars/WeeklyCalendar';
import StudentCallbacks from '../components/Callback/StudentCallbacks';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import SignOut from '../components/loginComponents/SignOut';
import HomePageLinks from '../components/navagation/HomePageLinks';
import { useUser } from '../components/User';
import isAllowed from '../lib/isAllowed';
import DisplayPbisCardWidget from '../components/PBIS/DisplayPbisCardsWidget';
import StudentPbisData from '../components/PBIS/StudentPbisData';
import RequestReset from '../components/RequestReset';
import PbisFalcon from '../components/PBIS/PbisFalcon';

const DashboardContainerStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 650px) {
    flex-wrap: wrap;
  }
`;

export default function Home() {
  const me = useUser();
  if (!me) return <RequestReset />;
  return (
    <div>
      <main>
        <HomePageLinks me={me || {}} />
        <DashboardContainerStyles>
          <PbisFalcon />
          <WeeklyCalendar me={me || {}} />
          {isAllowed(me || {}, 'isTeacher') && (
            <TeacherDashboard teacher={me || {}} />
          )}
          {me && isAllowed(me, 'isStudent') && (
            <div>
              <h2>Welcome to the NCUJHS Dashboard {me.name}</h2>
              <StudentCallbacks />
              <StudentPbisData student={me} />
              <DisplayPbisCardWidget cards={me.studentPbisCards} />
            </div>
          )}
        </DashboardContainerStyles>
      </main>

      <footer>{me ? <SignOut /> : <RequestReset />}</footer>
    </div>
  );
}
