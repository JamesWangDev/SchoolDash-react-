import gql from 'graphql-tag';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';
import Loading from '../Loading';

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
      }
      block1Students {
        id
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
      }
      block2Students {
        id
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
      }
      block3Students {
        id
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
      }
      block4Students {
        id
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
      }
      block5Students {
        id
        callbackCount
        totalCallbackCount
        averageTimeToCompleteCallback
        PbisCardCount
        YearPbisCount
      }
      role {
        name
        hasTA
        hasClasses
      }
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
  console.log(data.user);
  const { user } = data;
  return (
    <div>
      <p>teacher info</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
