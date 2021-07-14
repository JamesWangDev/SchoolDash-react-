import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisplayError from '../ErrorMessage';
import Loading from '../Loading';

const GET_HOMEPAGE_LINKS = gql`
  query GET_HOMEPAGE_LINKS {
    allLinks(where: { onHomePage: true }) {
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
    color: white;
    padding: 0.1rem 1.5rem;
    height: max-content;
    border-radius: 2rem;
  }
`;

export default function HomePageLinks() {
  const { data, isLoading, error } = useGQLQuery(
    'HomePageLinks',
    GET_HOMEPAGE_LINKS,
    { initialData: [] }
  );

  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;

  return (
    <HomePageLinkStyles>
      {data.allLinks.map((link) => (
        <Link key={link.id} href={`http://${link.link}`}>
          {link.name}
        </Link>
      ))}
    </HomePageLinkStyles>
  );
}
