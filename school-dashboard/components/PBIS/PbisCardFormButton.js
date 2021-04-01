import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '../styles/Button';
import SearchForUserName from '../SearchForUserName';
import Form from '../styles/Form';

const CardButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  transition: ease-in-out 1s;
`;

const CardFormContainerStyles = styled.div`
  .visible {
    /* background: red; */
    opacity: 1;
    transition: all ease-in-out 0.6s;
  }
  .invisible {
    opacity: 1;
    transition: all ease-in 1s;
    transform: translateX(2000px);
  }
  form {
    z-index: 1000;
    width: 300px;
    position: absolute;
    margin-left: 20px;
    border-radius: 1rem;
    background: linear-gradient(to top left, var(--redTrans), var(--blueTrans));
  }
`;

function CardForm({ visible }) {
  console.log(visible);
  return (
    <CardFormContainerStyles>
      <div className={visible}>
        <Form>
          <h3>New PBIS Card</h3>

          <SearchForUserName name="studentName" />
          <label htmlFor="message">
            message
            <input
              type="text"
              id="message"
              name="message"
              placeholder="student Message"
              // value={inputs.message}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="category">
            Respect
            <input type="radio" name="category" id="respect" value="respect" />
          </label>
        </Form>
      </div>
    </CardFormContainerStyles>
  );
}

export default function PbisCardFormButton({ teacher }) {
  const [displayCardForm, setDisplayCardForm] = useState(false);
  return (
    <CardButtonContainer>
      <GradientButton
        style={{ height: '4rem' }}
        onClick={() => {
          setDisplayCardForm(!displayCardForm);
        }}
      >
        PBIS CARD
      </GradientButton>
      <CardForm visible={displayCardForm ? 'visible' : 'invisible'} />
    </CardButtonContainer>
  );
}
