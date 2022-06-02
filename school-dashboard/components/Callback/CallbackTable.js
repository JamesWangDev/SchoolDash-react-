import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import Table from '../Table';
import { useUser } from '../User';
import CallbackMessagesForTable from './CallbackMessagesForTable';
import MarkCallbackCompleted from './MarkCallbackCompleted';

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

export default function CallbackTable({ callbacks }) {
  const me = useUser();
  const callbacksMemo = useMemo(() => callbacks, [callbacks]);
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
            Cell: ({ cell }) => {
              let shortDescription = cell.value
                .split(' ')
                .reduce((acc, word) => {
                  if (acc.length > 50) {
                    return acc;
                  }
                  return `${acc} ${word}`;
                }, '');
              // if description was shortened add ...
              if (shortDescription.length < cell.value.length) {
                shortDescription = `${shortDescription}...`;
              }
              return (
                <>
                  <ToolTipStyles>
                    <Link href={`/callback/${cell.row.original.id}`}>
                      {shortDescription}
                    </Link>
                    <span className="toolTipText">{cell.value}</span>
                  </ToolTipStyles>
                </>
              );
            },
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
            Header: 'Message',
            accessor: 'messageFromTeacher',
            Cell: ({ cell }) => {
              // console.log(cell);
              return (
                <CallbackMessagesForTable callbackItem={cell.row.original} />
              );
            },
          }
          // {
          //   Header: 'Teacher',
          //   accessor: 'messageFromTeacher',
          //   Cell: ({ cell }) => (
          //     <Link href={`/callback/${cell.row.original.id}`}>
          //       <>
          //       {cell.value || '-----'} {' '}
          //       {cell.row.original.messageFromTeacherDate || ''}
          //       </>
          //     </Link>
          //   ),
          // },
          // {
          //   Header: 'Student',
          //   accessor: 'messageFromStudent',
          //   Cell: ({ cell }) => (
          //     <Link href={`/callback/${cell.row.original.id}`}>
          //       <>
          //       {cell.value || '-----'}{' '}
          //       {cell.row.original.messageFromStudentDate ||""}
          //       </>
          //     </Link>
          //   ),
          // },
        ],
      },
      {
        Header: 'Complete',
        columns: [
          {
            Header: 'Mark Completed',
            accessor: 'id',
            Cell: ({ cell }) => {
              // console.log(cell.row);
              const isTeacher = me.id === cell.row.original.teacher.id;
              return isTeacher ? (
                <MarkCallbackCompleted callback={cell.row.original} />
              ) : null;
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <p>
        You have {callbacksMemo.length} item
        {callbacksMemo.length === 1 ? '' : 's'} on Callback{' '}
      </p>
      <Table
        data={callbacksMemo || []}
        searchColumn="student.name"
        columns={columns}
      />
    </div>
  );
}
