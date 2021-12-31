import { gql, GraphQLClient } from 'graphql-request';
import NewStudentFocusButton from '../components/studentFocus/NewStudentFocusButton';
import StudentFocusTable from '../components/studentFocus/StudentFocusTable';
import { useUser } from '../components/User';
import { endpoint, prodEndpoint } from '../config';

const STATIC_STUDENT_FOCUS_QUERY = gql`
  query STATIC_STUDENT_FOCUS_QUERY {
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

export default function studentFocus(props) {
  const me = useUser();
  const { initialStudentFoci } = props;
  return (
    <div>
      <h1>Student Focus</h1>
      {!!me && <NewStudentFocusButton />}
      <StudentFocusTable initialData={initialStudentFoci} />
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
    graphQLClient.request(STATIC_STUDENT_FOCUS_QUERY);

  const initialStudentFoci = await fetchStudentFoci();

  return {
    props: {
      initialStudentFoci: initialStudentFoci.allStudentFoci,
    }, // will be passed to the page component as props
  };
}
