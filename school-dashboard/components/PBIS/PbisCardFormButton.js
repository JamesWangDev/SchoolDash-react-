import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '../styles/Button';
import SearchForUserName from '../SearchForUserName';

const CardButtonContainer = styled.div`
  padding: 20px;
  display: flex;
`;

const CardFormContainerStyles = styled.div`
  transition: ease-out 2s;
`;

function CardForm() {
  // console.log('cardForm');
  return (
    <CardFormContainerStyles>
      <p>Form here</p>
      <SearchForUserName name="studentName" />
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
      {displayCardForm && <CardForm />}
    </CardButtonContainer>
  );
}
