import Head from 'next/head';
import styled from 'styled-components';
import WeeklyCalendar from '../components/calendars/WeeklyCalendar';
import StudentCallbacks from '../components/Callback/StudentCallbacks';
import SignOut from '../components/loginComponents/SignOut';
import HomePageLinks from '../components/navagation/HomePageLinks';
import { useUser } from '../components/User';
import isAllowed from '../lib/isAllowed';
import DisplayPbisCardWidget from '../components/PBIS/DisplayPbisCardsWidget';
import StudentPbisData from '../components/PBIS/StudentPbisData';
import RequestReset from '../components/RequestReset';
import PbisFalcon from '../components/PBIS/PbisFalcon';
import PbisCardFormButton from '../components/PBIS/PbisCardFormButton';
import TeacherAssignments from '../components/Assignments/TeacherAssignments';
import TaCallbacks from '../components/Callback/TaCallback';
import UpdateMyPassword from '../components/users/UpdateMyPassword';
import ViewStudentPage from '../components/users/ViewStudentPage';
import StudentCakeChooser from '../components/Birthdays/StudentCakeChooser';
import NewBugReportButton from '../components/bugreports/NewBugReportButton';

const DashboardContainerStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
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
        <h1 className="center">Welcome to the NCUJHS Dashboard {me.name}</h1>
        <DashboardContainerStyles>
          {isAllowed(me || {}, 'isStaff') && (
            <PbisCardFormButton teacher={me} />
          )}
          <PbisFalcon />
          <HomePageLinks me={me || {}} />
          <WeeklyCalendar me={me || {}} />
          {isAllowed(me, 'hasClasses') && <TeacherAssignments />}
          {isAllowed(me, 'hasTA') && <TaCallbacks />}
          {me && isAllowed(me, 'isStudent') && (
            <div>
              {me?.birthday && !me?.birthday?.cakeType && (
                <StudentCakeChooser birthday={me.birthday} />
              )}
              <StudentCallbacks />
              {/* <AssignmentViewCardsStudent student={me} /> */}
              <StudentPbisData student={me} />
              <DisplayPbisCardWidget cards={me.studentPbisCards} />
            </div>
          )}
          {me &&
            isAllowed(me, 'isParent') &&
            me.children.map((child) => (
              <div key={child.id}>
                <ViewStudentPage student={child} />
              </div>
            ))}
        </DashboardContainerStyles>
      </main>

      <footer>
        {me ? (
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <SignOut />
            <NewBugReportButton />
            <UpdateMyPassword />
          </div>
        ) : (
          <RequestReset />
        )}
      </footer>
    </div>
  );
}
