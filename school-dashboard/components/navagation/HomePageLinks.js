import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisplayError from '../ErrorMessage';

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
  a {
    background: linear-gradient(to top right, var(--red), var(--blue));
    color: white;
    padding: 0.1rem 1.5rem;
    border-radius: 2rem;
  }
`;

export default function HomePageLinks() {
  const { data, isLoading, error } = useGQLQuery(
    'HomePageLinks',
    GET_HOMEPAGE_LINKS
  );

  if (isLoading) return <p>Links Loading</p>;
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