import Link from 'next/link';
import styled from 'styled-components';
import { useIsFetching } from 'react-query';
import { GiFalconMoon } from 'react-icons/gi';
import Search from '../Search';
import { useUser } from '../User';
import Nav from './Nav';
import MessagesCount from '../Messages/MessagesCount';
import isAllowed from '../../lib/isAllowed';

const Logo = styled.h1`
  font-size: 3.5rem;
  margin-left: 3rem;
  padding-left: 1rem;
  position: relative;
  z-index: 4;
  margin-right: 7rem;
  background-image: linear-gradient(to top left, var(--red), var(--blue));
  border-radius: 1rem;
  transform: skew(-20deg);
  max-width: min-content;
  .small {
    display: none;
  }
  a {
    color: var(--navTextColor);
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
  @media (max-width: 1100px) {
    font-size: 3rem;
  }
  @media (max-width: 800px) {
    display: none;
  }
  /* .small {
    @media (max-width: 800px) {
      display: block;
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: red;
    }
  } */
`;

const HeaderStyles = styled.header`
  background: linear-gradient(to top right, var(--blue), var(--red));

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
  .loading {
    -webkit-animation: Animation 0.5s ease infinite;
    -moz-animation: Animation 0.5s ease infinite;
    animation: Animation 0.5s ease infinite;
    @-webkit-keyframes Animation {
      0% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.7;
      }
    }
    @-moz-keyframes Animation {
      0% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.7;
      }
    }
    @keyframes Animation {
      0% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.7;
      }
    }
  }
`;

export default function Header() {
  const me = useUser();
  const isFetching = useIsFetching();
  return (
    <>
      <HeaderStyles>
        <div className="bar">
          <Logo className={isFetching ? 'loading' : ''}>
            <div className="big">
              <Link className="big" href="/">
                NCUJHS Dashboard
              </Link>
            </div>
          </Logo>
          <Nav />
        </div>
        {isAllowed(me, 'isStaff') && (
          <div className="sub-bar">
            <Search />
          </div>
        )}
      </HeaderStyles>
      {!!me && <MessagesCount />}
    </>
  );
}
