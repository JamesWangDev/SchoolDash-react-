import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import Table from '../Table';
import { useUser } from '../User';

export const ToolTipStyles = styled.div`
  position: relative;
  display: inline-block;
  .toolTipText {
    visibility: hidden;
    width: clamp(200px, 30vw, 60vw);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  :hover .toolTipText {
    visibility: visible;
  }
`;

export default function TrimesterAwardsTable({ awards }) {
  const me = useUser();
  const awardsMemo = useMemo(() => awards, [awards]);
  const columns = useMemo(
    () => [
      {
        Header: 'Trimester Awards For Current Trimester',
        columns: [
          {
            Header: 'Student',
            accessor: 'student.name',
            Cell: ({ value }) => {
              // capitalize first letter of each word
              const name = value
                .split(' ')
                .map(
                  (word) => `${word.charAt(0).toUpperCase() + word.slice(1)} `
                );
              return name;
            },
          },
          {
            Header: 'Teacher',
            accessor: 'teacher.name',
          },
          {
            Header: 'Award',
            accessor: 'howl',
          },
          {
            Header: 'Trimester',
            accessor: 'trimester',
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <Table
        data={awardsMemo || []}
        searchColumn="student.name"
        columns={columns}
      />
    </div>
  );
}
