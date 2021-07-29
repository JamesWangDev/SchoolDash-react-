import gql from 'graphql-tag';
import Link from 'next/link';
import { useMemo } from 'react';
import DisplayError from '../components/ErrorMessage';
import Table from '../components/Table';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import NewLink from '../components/links/NewLink';
import Loading from '../components/Loading';
import isAllowed from '../lib/isAllowed';
import EditLink from '../components/links/EditLink';

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
  const hiddenColumns = editor ? '' : 'Edit';
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
        Header: 'Links',
        columns: [
          {
            Header: 'Edit',
            Cell: ({ row }) => (
              <EditLink link={row.original} refetch={refetch} />
            ),
          },
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
        ],
      },
    ],
    []
  );
  console.log('editor', editor);
  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  return (
    <div>
      <NewLink hidden={!editor} refetchLinks={refetch} />
      <Table
        data={data?.allLinks || []}
        columns={columns}
        searchColumn="name"
        hiddenColumns={hiddenColumns}
      />
    </div>
  );
}
