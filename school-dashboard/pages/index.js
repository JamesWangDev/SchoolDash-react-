import Head from 'next/head';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Link from 'next/link';
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
import { useGQLQuery } from '../lib/useGqlQuery';
import AssignmentViewCardsStudent from '../components/Assignments/AssignmentViewCardsStudent';
import GradientButton from '../components/styles/Button';

const DashboardContainerStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 650px) {
    flex-wrap: wrap;
  }
`;

const GET_STUDENT_CLASSSWORK_QUERY = gql`
  query GET_SINGLE_TEACHER($id: ID!) {
    user: User(where: { id: $id }) {
      id
      name
      email

      block1Teacher {
        name
        id
        block1ClassName
        block1Assignment
        block1AssignmentLastUpdated
      }
      block2Teacher {
        name
        id
        block2ClassName
        block2Assignment
        block2AssignmentLastUpdated
      }
      block3Teacher {
        name
        id
        block3ClassName
        block3Assignment
        block3AssignmentLastUpdated
      }
      block4Teacher {
        name
        id
        block4ClassName
        block4Assignment
        block4AssignmentLastUpdated
      }
      block5Teacher {
        name
        id
        block5ClassName
        block5Assignment
        block5AssignmentLastUpdated
      }
    }
  }
`;

export default function Home() {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    `SingleStudentClasswork-${me?.id}`,
    GET_STUDENT_CLASSSWORK_QUERY,
    { id: me?.id },
    { enabled: !!me?.isStudent }
  );
  if (!me) return <RequestReset />;
  return (
    <div>
      <main>
        <h1 className="center">Welcome to the NCUJHS Dashboard {me.name}</h1>
        <DashboardContainerStyles>
          {me && isAllowed(me || {}, 'isStaff') && (
            <PbisCardFormButton teacher={me} />
          )}
          {me && isAllowed(me || {}, 'hasClasses') && (
            <GradientButton>
              <Link href={`/userProfile/${me?.id}`}>My Students</Link>
            </GradientButton>
          )}
          {me && isAllowed(me || {}, 'isStaff') && (
            <GradientButton>
              <Link href="/trimesterAwards">Trimester Awards</Link>
            </GradientButton>
          )}
          {me && isAllowed(me || {}, 'isStaff') && (
            <GradientButton>
              <Link href="/allTeacherCurrentWork">Current Work</Link>
            </GradientButton>
          )}
          {!!me && (
            <>
              <PbisFalcon />
              <HomePageLinks me={me || {}} />
              <WeeklyCalendar me={me || {}} />
              {isAllowed(me, 'hasClasses') && <TeacherAssignments />}
              {isAllowed(me, 'hasTA') && <TaCallbacks />}
            </>
          )}
          {me && isAllowed(me, 'isStudent') && (
            <div>
              {me?.birthday && !me?.birthday?.cakeType && (
                <StudentCakeChooser birthday={me.birthday} />
              )}
              <StudentCallbacks />
              {data?.user && (
                <AssignmentViewCardsStudent student={data?.user} />
              )}
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
