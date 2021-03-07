import gql from 'graphql-tag';
import { useMemo } from 'react';
import Link from 'next/link';
import { useUser } from '../User';
import NewCalendar from './NewCalendar';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Table from '../Table';

export const GET_CALENDARS = gql`
  query GET_CALENDARS {
    allCalendars(sortBy: date_ASC) {
      name
      id
      description
      date
      author {
        name
      }
      status
      dateCreated
      link
      linkTitle
    }
  }
`;

export default function Calendars({ dates }) {
  const user = useUser();
  const editor = user?.role?.some((role) => role.canManageCalendar);
  const { data, isLoading, error, refetch } = useGQLQuery(
    'allCalendars',
    GET_CALENDARS
  );
  //   console.log(data);
  const filteredCalendars = data?.allCalendars.filter(
    (singleCalendarToFilter) => {
      // console.log(singleCalendarToFilter);
      const date = new Date(singleCalendarToFilter.date);
      const filterDate = new Date(dates.date);
      return date >= filterDate;
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Events',
        columns: [
          {
            Header: 'Event',
            accessor: 'name',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Date',
            accessor: 'date',
            Cell: ({ cell: { value } }) => {
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
    ],
    []
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <NewCalendar hidden={!editor} refetchCalendars={refetch} />
      <Table
        data={filteredCalendars || []}
        columns={columns}
        searchColumn="name"
      />
    </>
  );
}
