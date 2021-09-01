import { useMemo } from 'react';
import Link from 'next/link';
import Table from '../Table';

export default function ViewTaStudentTable({ users, title }) {
  const columns = useMemo(
    () => [
      {
        Header: title || 'Students',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }) => {
              const { name } = row.original;
              const nameWithFirstLetterUpperCase = name
                .split(' ')
                .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(' ');

              const { preferredName } = row.original;
              const nameToShow = preferredName
                ? `${nameWithFirstLetterUpperCase} - (${preferredName})`
                : nameWithFirstLetterUpperCase;
              return (
                <Link href={`/userProfile/${row.original.id}`}>
                  {nameToShow}
                </Link>
              );
            },
          },

          {
            Header: 'Callback',
            accessor: 'callbackCount',
          },
          {
            Header: 'Weekly PBIS',
            accessor: 'PbisCardCount',
          },
          {
            Header: 'Yearly PBIS',
            accessor: 'YearPbisCount',
          },
          {
            Header: 'Average days on callback',
            accessor: 'averageTimeToCompleteCallback',
          },
          {
            Header: 'Block 1',
            accessor: 'block1Teacher.name',
            Cell: ({ row }) => {
              const showLink = !!row.original?.block1Teacher?.id;
              //   console.log(showLink);
              if (showLink)
                return (
                  <Link
                    href={`/userProfile/${row.original?.block1Teacher?.id}`}
                  >
                    {row.original?.block1Teacher?.name}
                  </Link>
                );
              return null;
            },
          },
          {
            Header: 'Block 2',
            accessor: 'block2Teacher.name',
            Cell: ({ row }) => {
              const showLink = !!row.original?.block2Teacher?.id;
              //   console.log(showLink);
              if (showLink)
                return (
                  <Link
                    href={`/userProfile/${row.original?.block2Teacher?.id}`}
                  >
                    {row.original?.block2Teacher?.name}
                  </Link>
                );
              return null;
            },
          },
          {
            Header: 'Block 3',
            accessor: 'block3Teacher.name',
            Cell: ({ row }) => {
              const showLink = !!row.original?.block3Teacher?.id;
              //   console.log(showLink);
              if (showLink)
                return (
                  <Link
                    href={`/userProfile/${row.original?.block3Teacher?.id}`}
                  >
                    {row.original?.block3Teacher?.name}
                  </Link>
                );
              return null;
            },
          },
          {
            Header: 'Block 4',
            accessor: 'block4Teacher.name',
            Cell: ({ row }) => {
              const showLink = !!row.original?.block4Teacher?.id;
              //   console.log(showLink);
              if (showLink)
                return (
                  <Link
                    href={`/userProfile/${row.original?.block4Teacher?.id}`}
                  >
                    {row.original?.block4Teacher?.name}
                  </Link>
                );
              return null;
            },
          },
          {
            Header: 'Block 5',
            accessor: 'block5Teacher.name',
            Cell: ({ row }) => {
              const showLink = !!row.original?.block5Teacher?.id;
              // console.log(row);
              if (showLink)
                return (
                  <Link
                    href={`/userProfile/${row.original?.block5Teacher?.id}`}
                  >
                    {row.original?.block5Teacher?.name}
                  </Link>
                );
              return null;
            },
          },
          {
            Header: 'Parent Account',
            accessor: 'parent',
            Cell: ({ cell }) => {
              const parentAcountExist = cell.value?.length > 0;
              // console.log(parentAcountExist);
              return parentAcountExist ? '✅' : '❌';
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <Table
        data={users || []}
        columns={columns}
        searchColumn="name"
        showSearch={false}
      />
    </div>
  );
}
