import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisplayError from '../ErrorMessage';
import Loading from '../Loading';
import { useUser } from '../User';

const GET_HOMEPAGE_LINKS = gql`
  query GET_HOMEPAGE_LINKS(
    $forParents: Boolean = false
    $forStudents: Boolean = false
    $forTeachers: Boolean = false
  ) {
    allLinks(
      where: {
        onHomePage: true
        OR: [
          { forParents: $forParents }
          { forStudents: $forStudents }
          { forTeachers: $forTeachers }
        ]
      }
    ) {
      id
      link
      name
    }
  }
`;

const HomePageLinkStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  a {
    background: linear-gradient(to top right, var(--red), var(--blue));
    color: var(--navTextColor);
    padding: 0.1rem 1.5rem;
    height: max-content;
    border-radius: 2rem;
    margin: 0.5rem;
  }
`;

export default function HomePageLinks() {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    'HomePageLinks',
    GET_HOMEPAGE_LINKS,
    {
      forTeachers: me.isStaff || null,
      forParents: me.isParent || null,
      forStudents: me.isStudent || null,
    },
    { enabled: !!me }
  );

  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;

  return (
    <HomePageLinkStyles>
      {data?.allLinks?.map((link) => {
        const linkToUse = link.link.startsWith('http')
          ? `${link.link}`
          : `http://${link.link}`;
        return (
          <Link key={link.id} href={linkToUse}>
            {link.name}
          </Link>
        );
      })}
    </HomePageLinkStyles>
  );
}
