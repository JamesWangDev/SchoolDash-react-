import gql from 'graphql-tag';
import { GraphQLClient } from 'graphql-request';
import DisplayError from '../../components/ErrorMessage';
import TaTeacherInfo from '../../components/TA/TaTeacherInfo';
import { useUser } from '../../components/User';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';
import ViewTaStudentTable from '../../components/users/ViewTaStudentTable';
import CallbackTable from '../../components/Callback/CallbackTable';
import CountPhysicalCards from '../../components/PBIS/CountPhysicalCards';
import { endpoint, prodEndpoint } from '../../config';

const TA_INFO_QUERY = gql`
  query TA_INFO_QUERY($id: ID!) {
    taTeacher: User(where: { id: $id }) {
      PbisCardCount
      taPbisCardCount
      name
      id
      email

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

const TA_TEACHER_LIST_QUERY = gql`
  query TA_TEACHER_LIST_QUERY {
    allUsers(where: { hasTA: true }) {
      id
      name
      email
    }
  }
`;

export default function TA({ data: initialData }) {
  console.log(initialData?.taTeacher?.name);
  const me = useUser();
  const { data, isLoading, error, refetch } = useGQLQuery(
    `taInfo-${initialData?.taTeacher?.name}`,
    TA_INFO_QUERY,
    {
      id: initialData?.taTeacher?.id,
    },
    {
      enabled: !!me,
      initialData,
      staleTime: 0,
    }
  );
  if (!me) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  // get the callbacks from each student in the ta
  const allTaCallbacks = data.taTeacher.taStudents.map(
    (student) => student.callbackItems || null
  );
  const allTaCallbacksFlattened = [].concat(...allTaCallbacks);

  const isAllowedPbisCardCounting =
    me?.id === initialData?.taTeacher?.id || me?.canManagePbis;

  // console.log('callbacks', allTaCallbacksFlattened);
  const students = data.taTeacher.taStudents || [];
  return (
    <div>
      <h1>{data?.taTeacher?.name}'s TA</h1>
      {students.length > 0 && (
        <>
          {isAllowedPbisCardCounting && (
            <CountPhysicalCards taStudents={students} refetch={refetch} />
          )}
          <ViewTaStudentTable users={students} title="TA Students" />
          <CallbackTable callbacks={allTaCallbacksFlattened || []} />
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  // console.log(GraphQLClient);
  const fetchData = async () => graphQLClient.request(TA_TEACHER_LIST_QUERY);
  const data = await fetchData();
  const usersToUse = data.allUsers;

  const paths = usersToUse.map((user) => ({
    params: {
      id: user.id,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  // console.log(GraphQLClient);
  const fetchData = async () =>
    graphQLClient.request(TA_INFO_QUERY, { id: params.id });
  const data = await fetchData();
  // console.log(data);
  return {
    props: {
      data,
      revalidate: 60 * 60 * 3, // 3 hours (in seconds)
    },
  };
}
