import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }
  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

export const FormGroupStyles = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  div {
    min-width: 30%;
  }
`;

export const FormContainerStyles = styled.div`
  .hidden {
    position: absolute;
    transform: translatex(-500%);
    /* width: 100px; */
    /* opacity: 50%; */
    width: min(75%, 1000px);
    transition: all 0.5s ease-in;
    background-image: linear-gradient(to bottom, var(--blue), var(--red));
    z-index: 1000;
  }
  .visible {
    z-index: 1000;
    width: min(75%, 1000px);
    /* opacity: 100%; */
    transition: all 0.5s ease-out;
    margin: auto;
    /* transform: translatey(0%); */
    position: absolute;
    background-image: linear-gradient(to bottom, var(--blue), var(--red));
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid var(--tableAccentColor);
  padding: 20px;
  font-size: 1.8rem;
  line-height: 1.5;
  font-weight: 500;

  label {
    display: block;
    color: white;
    margin-bottom: 1rem;
    /* -webkit-text-stroke: 0.2px var(--lightGrey); */
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: var(--backgroundColor);
    color: var(--textColor);
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: radial-gradient(var(--blue), var(--red));
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.8rem 1.2rem;
    border-radius: 1rem;
  }
  input[type='radio'] {
    display: inline-block;
    /* margin: 20px; */
    width: 20px;
  }
  textarea {
    height: 5rem;
    resize: none;
    overflow-y: hidden;
    
    /* background-color: #ff3019; */
  }
  

  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
