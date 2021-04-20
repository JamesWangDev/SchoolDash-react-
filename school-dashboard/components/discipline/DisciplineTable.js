import Link from 'next/link';
import { useMemo } from 'react';
import Table from '../Table';

export default function DisciplineTable({ disciplines }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Discipline',
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
            Header: 'Date ',
            accessor: 'date',
            Cell: ({ cell: { value } }) => {
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today 📆` : displayDate;
            },
          },
          {
            Header: 'Class Type',
            accessor: 'classType',
          },
          {
            Header: 'Time',
            accessor: 'timeOfDay',
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <Table
        data={disciplines || []}
        searchColumn="student.name"
        columns={columns}
      />
    </div>
  );
}
