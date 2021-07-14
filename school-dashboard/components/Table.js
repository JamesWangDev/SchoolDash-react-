import { useState } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { UserTableStyles } from './styles/TableStyles';

export default function Table({
  columns,
  data,
  searchColumn,
  showSearch = true,
  hiddenColumns = [],
}) {
  const [filterInput, setFilterInput] = useState('');
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns,
      },
    },
    useFilters,
    useSortBy
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(searchColumn, value);
    setFilterInput(value);
  };

  // Render the UI for your table
  return (
    <UserTableStyles>
      {showSearch && (
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={`Search ${searchColumn.replace('.', ' ')}`}
        />
      )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sort-desc'
                        : 'sort-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </UserTableStyles>
  );
}
