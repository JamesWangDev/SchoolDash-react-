import Link from 'next/link';
import styled from 'styled-components';
import Search from '../Search';
import { useUser } from '../User';
import Nav from './Nav';
import MessagesCount from '../Messages/MessagesCount';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 3rem;
  padding-left: 1rem;
  position: relative;
  z-index: 4;
  margin-right: 1rem;
  background-image: linear-gradient(to top left, var(--red), var(--blue));
  border-radius: 1rem;
  transform: skew(-20deg);
  max-width: min-content;
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
  @media (max-width: 1100px) {
    font-size: 3rem;
  }
`;

const HeaderStyles = styled.header`
  background-image: linear-gradient(to top right, var(--blue), var(--red));
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

export default function Header() {
  const me = useUser();
  return (
    <>
      <HeaderStyles>
        <div className="bar">
          <Logo>
            <Link href="/">NCUJHS Dashboard</Link>
          </Logo>
          <Nav />
        </div>
        <div className="sub-bar">
          <Search />
        </div>
      </HeaderStyles>
      <MessagesCount />
    </>
  );
}
