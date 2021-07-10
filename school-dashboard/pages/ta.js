import gql from 'graphql-tag';
import DisplayError from '../components/ErrorMessage';
import TaTeacherInfo from '../components/TA/TaTeacherInfo';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import Loading from '../components/Loading';
import ViewStudentTable from '../components/users/ViewStudentTable';
import CallbackTable from '../components/Callback/CallbackTable';

const TA_INFO_QUERY = gql`
  query TA_INFO_QUERY($id: ID!) {
    taTeacher: User(where: { id: $id }) {
      PbisCardCount
      taPbisCardCount

      taTeam {
        teamName
        countedCards
        uncountedCards
        averageCardsPerStudent
        currentLevel
      }
      taStudents {
        averageTimeToCompleteCallback
        parent {
          name
          email
        }
        taTeacher {
          id
          name
        }
        id
        name
        parent {
          name
          email
        }
        block1Teacher {
          name
          id
          block1Assignment
        }
        block2Teacher {
          name
          id
          block2Assignment
        }
        block3Teacher {
          name
          id
          block3Assignment
        }
        block4Teacher {
          name
          id
          block4Assignment
        }
        block5Teacher {
          name
          id
          block5Assignment
        }
        callbackCount
        _studentCellPhoneViolationMeta {
          count
        }
        PbisCardCount

        _studentFocusStudentMeta {
          count
        }
        YearPbisCount
        _studentCellPhoneViolationMeta {
          count
        }
        studentPbisCards {
          id
          cardMessage
          category
          teacher {
            id
            name
          }
          dateGiven
        }
        callbackItems(where: { dateCompleted: null }) {
          id
          teacher {
            id
            name
          }
          student {
            name
            id
          }
          link
          description
          title
          dateAssigned
          dateCompleted
          messageFromStudent
          messageFromTeacher
        }
      }
    }
  }
`;

export default function TA() {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    'TaInfo',
    TA_INFO_QUERY,
    {
      id: me?.id,
    },
    {
      enabled: !!me,
    }
  );
  if (!me) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  // get the callbacks from each student in the ta
  const allTaCallbacks = data.taTeacher.taStudents.map(
    (student) => student.callbackItems || null
  );
  // console.log(allTaCallbacks);
  const students = data.taTeacher.taStudents || [];
  return (
    <div>
      <TaTeacherInfo />
      {students.map((student) => (
        <p key={student.id}>{student.name}</p>
      ))}
      {students.length > 0 && (
        <>
          <ViewStudentTable users={students} title="TA Students" />
          <CallbackTable callbacks={allTaCallbacks[0] || []} />
        </>
      )}
    </div>
  );
}
