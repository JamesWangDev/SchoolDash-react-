import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '../styles/Button';

const CardButtonContainer = styled.div`
  padding: 20px;
  display: flex;
`;

function CardForm() {
  console.log('cardForm');
  return (
    <div>
      <p>Form here</p>
    </div>
  );
}

export default function PbisCardFormButton({ teacher }) {
  const [displayCardForm, setDisplayCardForm] = useState(false);
  return (
    <CardButtonContainer>
      <GradientButton
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
