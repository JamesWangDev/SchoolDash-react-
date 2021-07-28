import gql from 'graphql-tag';
import Link from 'next/link';
import { useMemo } from 'react';
import DisplayError from '../components/ErrorMessage';
import Table from '../components/Table';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import NewLink from '../components/NewLink';
import Loading from '../components/Loading';
import isAllowed from '../lib/isAllowed';

const GET_ALL_LINKS_QUERY = gql`
  query GET_ALL_LINKS_QUERY(
    $forStudents: Boolean
    $forTeachers: Boolean
    $forParents: Boolean
  ) {
    allLinks(
      where: {
        OR: [
          { forParents: $forParents }
          { forStudents: $forStudents }
          { forTeachers: $forTeachers }
        ]
      }
    ) {
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
  const me = useUser();
  const editor = isAllowed(me, 'canManageLinks');
  const { data, isLoading, error, refetch } = useGQLQuery(
    'allLinks',
    GET_ALL_LINKS_QUERY,
    {
      forTeachers: me?.isStaff,
      forStudents: me?.isStudent,
      forParents: me?.isParent,
    },
    { enabled: !!me }
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }) => {
              const linkRaw = row.original.link;

              const link = linkRaw.startsWith('http')
                ? linkRaw
                : `http://${linkRaw}`;

              return <Link href={link}>{row.original.name}</Link>;
            },
          },
          {
            Header: 'description',
            accessor: 'description',
            Cell: ({ row }) => {
              const linkRaw = row.original.link;

              const link = linkRaw.startsWith('http')
                ? linkRaw
                : `http://${linkRaw}`;

              return <Link href={link}>{row.original.description}</Link>;
            },
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
