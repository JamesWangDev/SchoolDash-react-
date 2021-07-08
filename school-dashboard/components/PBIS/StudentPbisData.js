import React from 'react';

export default function StudentPbisData({ student }) {
  console.log(student);
  return (
    <div>
      <p>PBIS Cards to be counted: {student.PbisCardCount}</p>
      <p>Total PBIS Cards for the year: {student.YearPbisCount}</p>
    </div>
  );
}
