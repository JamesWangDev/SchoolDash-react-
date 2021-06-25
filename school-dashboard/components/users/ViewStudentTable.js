import { useMemo } from 'react';
import Link from 'next/link';
import Table from '../Table';

export default function ViewStudentTable({ users, title }) {
  const columns = useMemo(
    () => [
      {
        Header: title || 'Students',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }) => (
              <Link href={`/userProfile/${row.original?.id}`}>
                {row.original?.name}
              </Link>
            ),
          },

          {
            Header: 'TA Teacher',
            accessor: 'taTeacher.name',
            Cell: ({ row }) => {
              const showLink = !!row.original?.taTeacher?.id;
              //   console.log(showLink);
              if (showLink)
                return (
                  <Link href={`/userProfile/${row.original?.taTeacher?.id}`}>
                    {row.original?.taTeacher?.name}
                  </Link>
                );
              return null;
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
