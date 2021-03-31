import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '../styles/Button';
import SearchForUserName from '../SearchForUserName';
import Form from '../styles/Form';

const CardButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  transition: ease-in-out 2s;
`;

const CardFormContainerStyles = styled.div`
  .visible {
    /* background: red; */
    opacity: 1;
    transition: all ease-in-out 1s;
  }
  .invisible {
    opacity: 0;
    transition: all ease-out 1s;
  }
`;

function CardForm({ visible }) {
  console.log(visible);
  return (
    <CardFormContainerStyles>
      <div className={visible}>
        <Form>
          <p>Form here</p>

          <SearchForUserName name="studentName" />
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
