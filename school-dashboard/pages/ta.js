import gql from 'graphql-tag';
import DisplayError from '../components/ErrorMessage';
import TaTeacherInfo from '../components/TA/TaTeacherInfo';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';

const TA_INFO_QUERY = gql`
  query GTA_INFO_QUERY($id: ID) {
    taStudents: allUsers(where: { taTeacher: { id: $id } }) {
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
`;

export default function TA() {
  const user = useUser();
  const { data, isLoading, error } = useGQLQuery('TaInfo', TA_INFO_QUERY, {
    taTeacher: user?.id,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <DisplayError>{error.message}</DisplayError>;

  return (
    <div>
      <TaTeacherInfo />
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
