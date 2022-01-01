import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisplayError from '../ErrorMessage';
import Loading from '../Loading';
import { useUser } from '../User';

export const GET_HOMEPAGE_LINKS = gql`
  query GET_HOMEPAGE_LINKS {
    allLinks(where: { onHomePage: true }) {
      id
      link
      name
      forParents
      forStudents
      forTeachers
    }
  }
`;

const HomePageLinkStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  justify-content: space-around;
  a {
    background: linear-gradient(to top right, var(--red), var(--blue));
    color: var(--navTextColor);
    padding: 0.1rem 1.5rem;
    height: max-content;
    border-radius: 2rem;
    margin: 0.5rem;
  }
`;

export default function HomePageLinks({ initialData }) {
  // console.log('initialData', initialData);
  const me = useUser();
  // console.log('me', me);
  const { data, isLoading, error } = useGQLQuery(
    'HomePageLinks',
    GET_HOMEPAGE_LINKS,
    {},
    {
      enabled: !!me,
      initialData,
      staleTime: 1000 * 60 * 3, // 3 minutes
    }
  );

  if (!me) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  const filteredLinks = data?.allLinks?.filter((link) => {
    if (link.forParents && me.isParent) return true;
    if (link.forStudents && me.isStudent) return true;
    if (link.forTeachers && me.isStaff) return true;
    return false;
  });

  return (
    <HomePageLinkStyles>
      {filteredLinks.map((link) => {
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
