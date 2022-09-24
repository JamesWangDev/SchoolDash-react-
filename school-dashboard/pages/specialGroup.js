import gql from "graphql-tag";
import DisplayError from "../components/ErrorMessage";
import TaTeacherInfo from "../components/TA/TaTeacherInfo";
import { useUser } from "../components/User";
import { useGQLQuery } from "../lib/useGqlQuery";
import Loading from "../components/Loading";
import ViewTaStudentTable from "../components/users/ViewTaStudentTable";
import CallbackTable from "../components/Callback/CallbackTable";
import CountPhysicalCards from "../components/PBIS/CountPhysicalCards";
import { endpoint, prodEndpoint } from "../config";
import ModifySpecialGroup from "../components/modifySpecialGroup";
// import { ModifySpecialGroup } from "../components/modifySpecialGroup";

export const SPECIAL_GROUP_QUERY = gql`
  query specialGroup($id: ID!) {
    teacher: user(where: { id: $id }) {
      name
      id
      email

      specialGroupStudents {
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
        preferredName
        parent {
          id
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
        block6Teacher {
          name
          id
          block6Assignment
        }
        block7Teacher {
          name
          id
          block7Assignment
        }
        block8Teacher {
          name
          id
          block8Assignment
        }
        callbackCount
        studentCellPhoneViolationCount
        PbisCardCount

        studentFocusStudentCount
        YearPbisCount
        callbackItemsCount
        callbackItems(where: { dateCompleted: null }) {
          id
          teacher {
            id
            name
          }
          student {
            name
            preferredName
            id
          }
          link
          description
          title
          dateAssigned
          dateCompleted
          messageFromStudent
          messageFromTeacher
          messageFromStudentDate
          messageFromTeacherDate
        }
      }
    }
  }
`;

export default function SpecialGroup() {
  // console.log(query)
  // console.log(initialData?.taTeacher?.name);
  const me = useUser();
  const { data, isLoading, error, refetch } = useGQLQuery(
    `specialGroup-${me?.id}-${me?.name}-query`,
    SPECIAL_GROUP_QUERY,
    {
      id: me?.id,
    },
    {
      enabled: !!me,
      staleTime: 0,
    }
  );
  if (!me) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  // get the callbacks from each student in the ta
  const allTaCallbacks =
    data?.teacher?.specialGroupStudents?.map(
      (student) => student.callbackItems || null
    ) || [];
  const allTaCallbacksFlattened = [].concat(...allTaCallbacks) || [];

  // console.log('callbacks', allTaCallbacksFlattened);
  const students = data?.teacher?.specialGroupStudents || [];
  return (
    <div>
      <h1>{data?.teacher?.name}'s Special Group</h1>
      {students.length > 0 && (
        <>
          <ViewTaStudentTable users={students} title="TA Students" />
          <CallbackTable callbacks={allTaCallbacksFlattened || []} />
        </>
      )}
      <ModifySpecialGroup />
    </div>
  );
}
