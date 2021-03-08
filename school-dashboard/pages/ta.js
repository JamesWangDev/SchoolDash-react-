import gql from 'graphql-tag';
import DisplayError from '../components/ErrorMessage';
import TaTeacherInfo from '../components/TA/TaTeacherInfo';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';

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
      }
    }
  }
`;

export default function TA() {
  const user = useUser();
  const { data, isLoading, error } = useGQLQuery('TaInfo', TA_INFO_QUERY, {
    id: user?.id,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  const students = data.taTeacher.taStudents;
  return (
    <div>
      {/* <TaTeacherInfo /> */}
      <p>{JSON.stringify(data.taTeacher)}</p>
      {students.map((student) => (
        <p key={student.id}>{student.name}</p>
      ))}
    </div>
  );
}
