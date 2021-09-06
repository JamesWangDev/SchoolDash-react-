import gql from 'graphql-tag';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';
import Loading from '../Loading';
import AssignmentViewCardsStudent from '../Assignments/AssignmentViewCardsStudent';
import ViewStudentTable from './ViewStudentTable';
import CallbackCards from '../Callback/CallbackCards';
import StudentPbisData from '../PBIS/StudentPbisData';
import DisplayPbisCardsWidget from '../PBIS/DisplayPbisCardsWidget';
import EmailParentsAboutCallback from '../Callback/EmailParentsAboutCallback';

const ParentInfoStyles = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid var(--blue);
`;
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
      taTeacher {
        id
        name
      }
      parent {
        id
        name
        email
      }
      taTeam {
        teamName
        currentLevel
      }
      studentPbisCards(
        sortBy: dateGiven_ASC
        first: 20
        where: { category_not: "physical" }
      ) {
        id
        cardMessage
        category
        teacher {
          id
          name
        }
        dateGiven
      }
      studentFocusStudent(first: 2) {
        id
        comments
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
  const canSendCallbackEmail = !(data.user.callbackItems.length > 0);
  console.log(data.user.callbackItems.length);
  // console.log(user);
  return (
    <div>
      <h3>
        Student info for {student.name} TA: {user?.taTeacher?.name}
        <EmailParentsAboutCallback
          student={user}
          disabled={canSendCallbackEmail}
        />
      </h3>
      <AssignmentViewCardsStudent student={user} />
      <StudentPbisData student={user} />
      {user.parent.length > 0 && (
        <ParentInfoStyles>
          <h4>Parent Contact Info:</h4>
          {user.parent.map((parent) => (
            <p key={`parentID -${parent.id}`}>
              {parent.name} - {parent.email}
            </p>
          ))}
        </ParentInfoStyles>
      )}

      <CallbackCards callbacks={user.callbackItems || []} />
      <DisplayPbisCardsWidget cards={user.studentPbisCards || []} />
    </div>
  );
}
