import { useMemo } from 'react';
import Table from '../Table';

export default function CallbackTable({ callbacks }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Callback',
        columns: [
          {
            Header: 'Assignment',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          //   {
          //     Header: 'Date',
          //     accessor: 'date',
          //     Cell: ({ cell: { value } }) => {
          //       const today = new Date().toLocaleDateString();
          //       const displayDate = new Date(value).toLocaleDateString();
          //       const isToday = today === displayDate;
          //       return isToday ? `📆 Today 📆` : displayDate;
          //     },
          //   },
          //   {
          //     Header: 'Link',
          //     accessor: 'link',
          //     Cell: ({ cell: { value } }) => (
          //       <Link
          //         href={value?.startsWith('http') ? value : `http://${value}`}
          //       >
          //         {value ? 'Link' : ''}
          //       </Link>
          //     ),
          //   },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <p>Callbacks@@@</p>
      <Table data={callbacks || []} searchColumn="title" columns={columns} />
    </div>
  );
}
