import styled from "styled-components";

const GradientButton = styled.button`
  background-image: linear-gradient(to top left, var(--red), var(--blue));
  color: var(--navTextColor);
  font-weight: 500;
  border: 0;
  border-radius: 1rem;
  text-transform: uppercase;
  font-size: 1.6rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  margin: 2px;
  max-height: auto;
  outline: none;
  border: 1px solid var(--backgroundColor);
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    cursor: pointer;
    /* transform: skew(0deg); */
    transition: all 0.1s;
    border: 1px solid var(--red);
  }
`;
export const SmallGradientButton = styled.button`
  background-image: linear-gradient(to top left, var(--red), var(--blue));
  color: var(--navTextColor);
  font-weight: 500;
  border: 0;
  border-radius: 1rem;
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transform: skew(-3deg);
  display: inline-block;
  transition: all 0.5s;
  outline: none;
  border: 1px solid var(--backgroundColor);
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    cursor: pointer;
    /* transform: skew(0deg); */
    transition: all 0.1s;
    border: 1px solid var(--red);
  }
`;

export const LeftEdgeButton = styled.button`
  background: linear-gradient(to top left, var(--red), var(--blue));
  padding: 10px;
  position: absolute;
  left: 5px;
  border-radius: 1rem;
  opacity: 0.9;
  font-size: 1.5rem;
  color: var(--navTextColor);

  /* writing-mode: vertical-rl;
    text-orientation: upright; */
  word-spacing: 100vw;
  max-width: min-content;
  outline: none;
`;
export default GradientButton;
