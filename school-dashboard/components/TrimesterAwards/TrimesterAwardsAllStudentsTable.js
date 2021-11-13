import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import Table from '../Table';
import { useUser } from '../User';
import TrimesterAwardButton from './TrimesterAwardButton';

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

export default function TrimesterAwardsAllStudentsTable({
  students,
  trimester,
  refetch,
}) {
  const me = useUser();
  const studentsMemo = useMemo(() => students, [students]);
  const columns = useMemo(
    () => [
      {
        Header: 'Trimester Awards Per Student',
        columns: [
          {
            Header: 'Student',
            accessor: 'name',
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
            Header: 'Give Awards',
            accessor: 'awards',
            Cell: ({ cell }) => (
              // console.log(cell.row.original);
              // <p>test</p>
              <TrimesterAwardButton
                student={cell.row.original}
                trimester={trimester}
                refetch={refetch}
              />
            ),
          },
          {
            Header: 'Awards',
            accessor: 'awards.length',
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <Table data={studentsMemo || []} searchColumn="name" columns={columns} />
    </div>
  );
}
