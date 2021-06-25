import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';
import Loading from '../Loading';
import AssignmentViewCards from '../Assignments/AssignmentViewCards';
import ViewStudentTable from './ViewStudentTable';

const GET_SINGLE_TEACHER = gql`
  query GET_SINGLE_TEACHER($id: ID!) {
    user: User(where: { id: $id }) {
      id
      name
      email
      taStudents {
        id
        name
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
        _studentDisciplineMeta {
          count
        }
        _studentFocusStudentMeta {
          count
        }
        taTeacher {
          id
          name
        }
      }
      block1Students {
        id
        name
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
        taTeacher {
          id
          name
        }
      }
      block2Students {
        name
        id
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
        taTeacher {
          id
          name
        }
      }
      block3Students {
        id
        name
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
        taTeacher {
          id
          name
        }
      }
      block4Students {
        id
        name
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
        taTeacher {
          id
          name
        }
      }
      block5Students {
        id
        name
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
        taTeacher {
          id
          name
        }
      }
      role {
        name
        hasTA
        hasClasses
      }
      block1Assignment
      block1ClassName
      block1AssignmentLastUpdated
      block2Assignment
      block2ClassName
      block2AssignmentLastUpdated
      block3Assignment
      block3ClassName
      block3AssignmentLastUpdated
      block4Assignment
      block4ClassName
      block4AssignmentLastUpdated
      block5Assignment
      block5ClassName
      block5AssignmentLastUpdated
    }
  }
`;

export default function ViewTeacherPage({ teacher }) {
  const { data, isLoading, error } = useGQLQuery(
    `SingleTeacher-${teacher.id}`,
    GET_SINGLE_TEACHER,
    { id: teacher.id }
  );
  const me = useUser();
  if (isLoading) return <Loading />;
  //   console.log(data.user);
  const { user } = data;
  return (
    <div>
      <h3>Teacher info</h3>
      <AssignmentViewCards assignments={user} />
      {user.taStudents[0] && (
        <ViewStudentTable users={user.taStudents} title="TA Students" />
      )}
      {user.block1Students[0] && (
        <ViewStudentTable users={user.block1Students} title="Block 1" />
      )}
      {user.block2Students[0] && (
        <ViewStudentTable users={user.block2Students} title="Block 2" />
      )}
      {user.block3Students[0] && (
        <ViewStudentTable users={user.block3Students} title="Block 3" />
      )}
      {user.block4Students[0] && (
        <ViewStudentTable users={user.block4Students} title="Block 4" />
      )}
      {user.block5Students[0] && (
        <ViewStudentTable users={user.block5Students} title="Block 5" />
      )}
    </div>
  );
}
