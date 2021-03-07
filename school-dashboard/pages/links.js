import gql from 'graphql-tag';
import Link from 'next/link';
import { useMemo } from 'react';
import DisplayError from '../components/ErrorMessage';
import Table from '../components/Table';
import { useGQLQuery } from '../lib/useGqlQuery';

const GET_ALL_LINKS_QUERY = gql`
  query GET_ALL_LINKS_QUERY {
    allLinks {
      id
      name
      link
      linkTitle
      onHomePage
      description
      modified
      modifiedBy {
        name
        id
      }
    }
  }
`;

export default function Links() {
  const { data, isLoading, error } = useGQLQuery(
    'allLinks',
    GET_ALL_LINKS_QUERY
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }) => (
              <Link href={`http://${row.original.link}`}>
                {row.original.name}
              </Link>
            ),
          },
          {
            Header: 'description',
            accessor: 'description',
            Cell: ({ row }) => (
              <Link href={`http://${row.original.link}`}>
                {row.original.description}
              </Link>
            ),
          },
          {
            Header: 'Edit',
            Cell: ({ row }) => (
              <Link href={`/editLink/${row.original.id}`}>Edit</Link>
            ),
          },
        ],
      },
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  return (
    <div>
      <p> {JSON.stringify(data.allLinks)}</p>
      <Table data={data.allLinks} columns={columns} searchColumn="name" />
    </div>
  );
}
