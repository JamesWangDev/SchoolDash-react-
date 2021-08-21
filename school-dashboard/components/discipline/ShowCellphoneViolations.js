import Link from 'next/link';
import React, { useMemo } from 'react';
import GradientButton from '../styles/Button';
import Table from '../Table';

function getDisplayCellData(cellViolations) {
  const cellViolationsSortedByDate = cellViolations.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // function to take array of cell violations and get a list of individual student ids
  const getStudentIds = (cellViolations) => {
    const studentIds = [];
    cellViolations.forEach((cellViolation) => {
      if (studentIds.indexOf(cellViolation?.student?.id) === -1) {
        studentIds.push(cellViolation?.student?.id);
      }
    });
    return studentIds;
  };
  const uniqueStudentIds = getStudentIds(cellViolationsSortedByDate);

  // get the number of times each unique student comes up in the array of cell violations
  const getStudentCount = uniqueStudentIds.map((studentId) => {
    const cellViolationTotals = cellViolationsSortedByDate.filter(
      (cellViolation) => cellViolation?.student?.id === studentId
    ).length;
    return { id: studentId, count: cellViolationTotals };
  });
  const cellViolationsWithCounts = cellViolationsSortedByDate.map(
    (cellViolation) => {
      // get count that goes with this cell violation
      const cellViolationCount = getStudentCount.filter(
        (student) => student?.id === cellViolation?.student?.id
      )[0].count;
      return {
        ...cellViolation,
        count: cellViolationCount,
      };
    }
  );
  console.log(cellViolationsWithCounts);
  return cellViolationsWithCounts;
}

export default function ShowCellphoneViolations({ cellViolations }) {
  const [ShowCellphoneViolations, setShowCellphoneViolations] = React.useState(
    false
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Cell Phone Violations',
        columns: [
          {
            Header: 'Student',
            accessor: 'student.name',
            Cell: ({ cell }) => (
              <Link href={`/discipline/${cell?.row?.original?.id || ''}`}>
                {cell.value}
              </Link>
            ),
          },
          {
            Header: 'Teacher',
            accessor: 'teacher.name',
            Cell: ({ cell }) => (
              <Link href={`/discipline/${cell?.row?.original?.id || ''}`}>
                {cell.value}
              </Link>
            ),
          },

          {
            Header: 'Date ',
            accessor: 'dateGiven',
            Cell: ({ cell: { value } }) => {
              const today = new Date().toLocaleDateString();
              const displayDate = new Date(value).toLocaleDateString();
              const isToday = today === displayDate;
              return isToday ? `📆 Today` : displayDate;
            },
          },
          {
            Header: 'Total Violations',
            accessor: 'count',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className={ShowCellphoneViolations ? 'big' : ''}>
      <GradientButton
        onClick={() => setShowCellphoneViolations(!ShowCellphoneViolations)}
      >
        {ShowCellphoneViolations
          ? 'Hide Cell Phone Violations'
          : 'Show Cell Violations'}
      </GradientButton>
      {ShowCellphoneViolations && (
        <div className="big">
          <Table
            className="big"
            columns={columns}
            data={getDisplayCellData(cellViolations) || []}
            searchColumn="student.name"
          />
        </div>
      )}
    </div>
  );
}
