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
  const typesOfCakes =
    birthdays?.reduce((acc, birthday) => {
      const { cakeType } = birthday;
      if (!acc[cakeType]) {
        acc[cakeType] = 1;
      } else {
        acc[cakeType] += 1;
      }
      return acc;
    }, {}) || {};

  const undeliiveredCakes = birthdays?.filter(
    (birthday) => !birthday.hasDelivered
  );
  const typesOfUndeliverdCakes =
    undeliiveredCakes?.reduce((acc, birthday) => {
      const { cakeType } = birthday;
      if (!acc[cakeType]) {
        acc[cakeType] = 1;
      } else {
        acc[cakeType] += 1;
      }
      return acc;
    }, {}) || {};
  // console.log(undeliiveredCakes);
  return (
    <div>
      <h2>This weeks Birthdays</h2>
      <Table
        columns={columns}
        data={thisWeeksBirthdays || []}
        searchColumn="student.name"
      />
      <h2>Types Of Cakes Left To Deliver</h2>
      {Object.keys(typesOfUndeliverdCakes).map((cakeType) => (
        <div key={cakeType}>
          {cakeType !== 'null' ? cakeType : 'Not Yet Chosen'}:{' '}
          {typesOfUndeliverdCakes[cakeType]}
        </div>
      ))}
      <h2>Types Of Cakes Total For The Year</h2>
      {Object.keys(typesOfCakes).map((cakeType) => (
        <div key={cakeType}>
          {cakeType !== 'null' ? cakeType : 'Not Yet Chosen'}:{' '}
          {typesOfCakes[cakeType]}
        </div>
      ))}
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
