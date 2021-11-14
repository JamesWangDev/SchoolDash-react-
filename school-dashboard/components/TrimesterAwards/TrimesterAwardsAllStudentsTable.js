import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import Table from '../Table';
import { useUser } from '../User';
import TrimesterAwardButton from './TrimesterAwardButton';

export const ToolTipStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
    //set os right edge is even with the right edge of the parent
    right: 0;
    z-index: 100;
  }

  :hover .toolTipText {
    visibility: visible;
  }
  .infoAvailable {
    display: inline-block;
    text-align: center;
    color: white;
    border-radius: 1000px;
    background: linear-gradient(to top right, var(--red), var(--blue));
    width: 4rem;
    height: 3rem;
    margin: 1rem;
    /* padding: 0rem; */
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
            accessor: 'giveAwards',
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
            Cell: ({ cell }) => {
              const awards = cell.row.original.awards.map(
                (award) => `${award.teacher.name} - ${award.howl.toUpperCase()}`
              );
              const numberOfAwards = cell.row.original.awards.length;
              return (
                <ToolTipStyles>
                  <span>{numberOfAwards}</span>
                  {numberOfAwards > 0 && (
                    <>
                      <span className="infoAvailable">info</span>
                      <div className="toolTipText">
                        {awards.map((award) => (
                          <p>{award}</p>
                        ))}
                      </div>
                    </>
                  )}
                </ToolTipStyles>
              );
            },
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
