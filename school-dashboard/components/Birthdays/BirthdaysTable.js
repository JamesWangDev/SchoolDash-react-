import React, { useMemo } from 'react';
import Table from '../Table';
import DeliveredCake from './DeliveredCake';
import getThisWeeksBirthdays from './getThisWeeksBirthdays';
import MissingBirthdays from './MissingBirthdays';

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
            Header: 'Delivered Cake',
            accessor: 'hasDelivered',
            Cell: ({ cell }) => <DeliveredCake cake={cell.row.original} />,
          },
        ],
      },
    ],
    []
  );
  const thisWeeksBirthdays = getThisWeeksBirthdays(birthdays);

  return (
    <div>
      <h2>This weeks Birthdays</h2>
      <Table
        columns={columns}
        data={thisWeeksBirthdays || []}
        searchColumn="student.name"
      />
      <h2>Missing Birthdays</h2>
      <MissingBirthdays />
      <h2>All Birthdays</h2>
      <Table
        data={birthdays || []}
        searchColumn="student.name"
        columns={columns}
      />
    </div>
  );
}
