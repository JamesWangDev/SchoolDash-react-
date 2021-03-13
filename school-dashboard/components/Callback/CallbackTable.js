import Link from 'next/link';
import { useMemo } from 'react';
import Table from '../Table';

export default function CallbackTable({ callbacks }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Callback',
        columns: [
          {
            Header: 'Student',
            accessor: 'student.name',
          },
          {
            Header: 'Teacher',
            accessor: 'teacher.name',
          },
          {
            Header: 'Assignment',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Date Assigned',
            accessor: 'dateAssigned',
            Cell: ({ cell: { value } }) => {
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today 📆` : displayDate;
            },
          },
          {
            Header: 'Completed',
            accessor: 'dateCompleted',
            Cell: ({ cell: { value } }) => {
              if (!value) {
                return <>---</>;
              }
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today 📆` : displayDate;
            },
          },
          {
            Header: 'Link',
            accessor: 'link',
            Cell: ({ cell: { value } }) => (
              <Link
                href={value?.startsWith('http') ? value : `http://${value}`}
              >
                {value ? 'Link' : ''}
              </Link>
            ),
          },
        ],
      },
      {
        Header: 'Message',
        columns: [
          {
            Header: 'Teacher',
            accessor: 'messageFromTeacher',
          },
          {
            Header: 'Student',
            accessor: 'messageFromStudent',
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <p>
        You have {callbacks.length} item{callbacks.length === 1 ? '' : 's'} on
        Callback{' '}
      </p>
      <Table
        data={callbacks || []}
        searchColumn="student.name"
        columns={columns}
      />
    </div>
  );
}
