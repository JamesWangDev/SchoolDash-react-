import gql from 'graphql-tag';
import { useMemo } from 'react';
import Table from '../Table';

import { useGQLQuery } from '../../lib/useGqlQuery';
import DisplayError from '../ErrorMessage';
import Loading from '../Loading';

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

export default function StudentFocusTable(initialStudentFoci) {
  // console.log(initialStudentFoci);
  const { data, isLoading, error } = useGQLQuery(
    'allStudentFocus',
    ALL_STUDENT_FOCUS_QUERY,
    {
      initialData: initialStudentFoci,
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

  // if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  return (
    <div>
      <Table
        data={data?.allStudentFoci || []}
        columns={columns}
        searchColumn="student.name"
      />
    </div>
  );
}
