import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';
import Loading from '../Loading';
import AssignmentViewCardsStudent from '../Assignments/AssignmentViewCardsStudent';
import ViewStudentTable from './ViewStudentTable';
import CallbackCards from '../Callback/CallbackCards';
import StudentPbisData from '../PBIS/StudentPbisData';
import DisplayPbisCardsWidget from '../PBIS/DisplayPbisCardsWidget';

const GET_SINGLE_TEACHER = gql`
  query GET_SINGLE_TEACHER($id: ID!) {
    user: User(where: { id: $id }) {
      id
      name
      email
      PbisCardCount
      YearPbisCount
      callbackItems(where: { dateCompleted: null }) {
        id
        title
        student {
          id
          name
        }
        teacher {
          id
          name
        }
        dateAssigned
        description
        link
        messageFromTeacher

        messageFromStudent
      }
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

      parent {
        name
        email
      }
      taTeam {
        teamName
        currentLevel
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
    }
  }
`;

export default function ViewStudentPage({ student }) {
  const { data, isLoading, error } = useGQLQuery(
    `SingleStudent-${student.id}`,
    GET_SINGLE_TEACHER,
    { id: student.id }
  );
  const me = useUser();
  if (isLoading) return <Loading />;
  const { user } = data;
  // console.log(user);
  return (
    <div>
      <h3>Student info</h3>
      <AssignmentViewCardsStudent student={user} />
      <StudentPbisData student={user} />
      {user.parent.length > 0 && <h4>Parent Contact Info:</h4>}
      {user.parent.map((parent) => (
        <p>
          {parent.name} - {parent.email}
        </p>
      ))}

      <CallbackCards callbacks={user.callbackItems || []} />
      <DisplayPbisCardsWidget cards={user.studentPbisCards || []} />
    </div>
  );
}
