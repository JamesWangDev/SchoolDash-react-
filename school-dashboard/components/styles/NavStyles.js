import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  margin-right: 40px;
  padding: 0;
  display: flex;
  justify-self: flex-end;
  font-size: 2rem;
  color: var(--navTextColor);

  a,
  button {
    padding: 0rem 2rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.4rem;
    color: var(--navTextColor);
    background: none;
    border: 0;
    white-space: nowrap;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background-image: linear-gradient(to bottom, var(--blue), var(--red));
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
      @media (max-width: 1150px) {
        width: 0px;
      }
    }
    &:after {
      height: 4px;
      background-image: linear-gradient(to left, var(--blue), var(--red));
      z-index: 5;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 3);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--red);
      color: var(--blue);
      &:after {
        width: calc(50%);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1300px) {
    /* border-top: 1px solid var(--lightGrey); */
    width: 100%;
    justify-content: flex-end;
    a,
    button {
      font-size: 1.15rem;
    }
    font-size: 1.1rem;
  }
  @media (max-width: 1150px) {
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-around;
    width: auto;
    a {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 0.5rem;
      height: 4rem;
      /* margin-top: 2rem; */
    }
    &:before {
      width: 0px;
    }

    a,
    button {
      flex-basis: 20%;
      margin-left: 2rem;
      @media (max-width: 900px) {
        margin: 0;
      }
    }
  }
`;

export default NavStyles;
