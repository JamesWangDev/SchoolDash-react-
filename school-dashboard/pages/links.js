import gql from 'graphql-tag';
import Link from 'next/link';
import { useMemo } from 'react';
import DisplayError from '../components/ErrorMessage';
import Table from '../components/Table';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import NewLink from '../components/NewLink';
import Loading from '../components/Loading';

const GET_ALL_LINKS_QUERY = gql`
  query GET_ALL_LINKS_QUERY {
    allLinks {
      id
      name
      link
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
  const user = useUser();
  const editor = user?.role?.some((role) => role.canManageLinks);
  const { data, isLoading, error, refetch } = useGQLQuery(
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
            Cell: ({ row }) => {
              if (!editor) return <p />;
              return <Link href={`/editLink/${row.original.id}`}>Edit</Link>;
            },
          },
        ],
      },
    ],
    []
  );

  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  return (
    <div>
      <NewLink hidden={!editor} refetchLinks={refetch} />
      <Table data={data.allLinks} columns={columns} searchColumn="name" />
    </div>
  );
}
