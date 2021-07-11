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
            Cell: ({ cell }) => (
              <Link
                href={`/userProfile/${cell?.row?.original?.student?.id || ''}`}
              >
                {cell.value}
              </Link>
            ),
          },
          {
            Header: 'Teacher',
            accessor: 'teacher.name',
            Cell: ({ cell }) => (
              <Link
                href={`/userProfile/${cell?.row?.original?.teacher?.id || ''}`}
              >
                {cell.value}
              </Link>
            ),
          },
          {
            Header: 'Assignment',
            accessor: 'title',
            Cell: ({ cell }) => (
              <Link href={`/callback/${cell.row.original.id}`}>
                {cell.value}
              </Link>
            ),
          },
          {
            Header: 'Description',
            accessor: 'description',
            Cell: ({ cell }) => (
              <Link href={`/callback/${cell.row.original.id}`}>
                {cell.value}
              </Link>
            ),
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
            Cell: ({ cell }) => (
              <Link href={`/callback/${cell.row.original.id}`}>
                {cell.value || '-----'}
              </Link>
            ),
          },
          {
            Header: 'Student',
            accessor: 'messageFromStudent',
            Cell: ({ cell }) => (
              <Link href={`/callback/${cell.row.original.id}`}>
                {cell.value || '-----'}
              </Link>
            ),
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
