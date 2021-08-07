import React, { useMemo } from 'react';
import Table from '../Table';

export default function BirthdaysTable({ birthdays }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Birthday Cake Data',
        columns: [
          {
            Header: 'Student',
            accessor: 'student.name',
          },
          {
            Header: 'TA Teacher',
            accessor: 'student.taTeacher.name',
          },
          {
            Header: 'Cake Type',
            accessor: 'cakeType',
          },
          {
            Header: 'Birthday',
            accessor: 'date',
            Cell: ({ cell: { value } }) => {
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today 📆` : displayDate;
            },
          },
          {
            Header: 'Chosen Cake',
            accessor: 'hasChosen',
            Cell: ({ cell: { value } }) => (
              <>{value ? '🧁🧁🧁🧁🧁🧁🧁🧁' : 'no'}</>
            ),
          },
          {
            Header: 'Delivered Cake',
            accessor: 'hasDelivered',
            Cell: ({ cell: { value } }) => (
              <>{value ? '🧁🧁🧁🧁🧁🧁🧁🧁' : 'no'}</>
            ),
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <p>here be the birthdays</p>
      <Table
        data={birthdays || []}
        searchColumn="student.name"
        columns={columns}
      />
    </div>
  );
}
