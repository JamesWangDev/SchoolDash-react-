import { gql, GraphQLClient } from 'graphql-request';
import { useMemo } from 'react';
import NewStudentFocusButton from '../components/studentFocus/NewStudentFocusButton';
import StudentFocusTable from '../components/studentFocus/StudentFocusTable';
import { useUser } from '../components/User';
import { endpoint, prodEndpoint } from '../config';
import { useGQLQuery } from '../lib/useGqlQuery';
import Table from '../components/Table';

const ALL_STUDENT_FOCUS_QUERY = gql`
  query ALL_STUDENT_FOCUS_QUERY {
    allStudentFoci(sortBy: dateCreated_DESC) {
      id
      comments
      category
      dateCreated
      student {
        name
        id
        taTeacher {
          id
          name
        }
        parent {
          id
          name
          email
        }
      }
      teacher {
        name
        id
      }
    }
  }
`;

export default function StudentFocus(props) {
  // console.log(props.initialData);
  const me = useUser();
  const cachedStudentFoci = props?.initialStudentFoci;
  // console.log('cachedStudentFoci', cachedStudentFoci);
  const { data, isLoading, error } = useGQLQuery(
    'allStudentFocus',
    ALL_STUDENT_FOCUS_QUERY,
    {},
    {
      initialData: cachedStudentFoci,
      staleTime: 1000 * 60 * 3,
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Student Focus',
        columns: [
          {
            Header: 'Name',
            accessor: 'student.name',
          },
          {
            Header: 'Teacher',
            accessor: 'teacher.name',
          },
          {
            Header: 'TA Teacher',
            accessor: 'student.taTeacher.name',
          },
          {
            Header: 'Comments',
            accessor: 'comments',
          },
          {
            Header: 'Catergory',
            accessor: 'category',
          },
          {
            Header: 'Date',
            accessor: 'dateCreated',
            Cell: ({ cell: { value } }) => {
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today 📆` : displayDate;
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <h1>Student Focus</h1>
      {!!me && <NewStudentFocusButton />}

      <Table
        data={data?.allStudentFoci || []}
        columns={columns}
        searchColumn="student.name"
      />
    </div>
  );
}

export async function getStaticProps(context) {
  // console.log(context);
  // fetch PBIS Page data from the server
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
  const fetchStudentFoci = async () =>
    graphQLClient.request(ALL_STUDENT_FOCUS_QUERY);

  const initialStudentFoci = await fetchStudentFoci();

  return {
    props: {
      initialStudentFoci,
    }, // will be passed to the page component as props
    revalidate: false,
  };
}
