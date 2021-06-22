import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const RECALCULATE_CALLBACK_MUTATION = gql`
  mutation RECALCULATE_CALLBACK_MUTATION {
    recalculateCallback(callbackID: "60d241394ed33bf4adc86e87") {
      id
    }
  }
`;

export default function useRecalculateCallback() {
  const [callbackIdToUpdate, setCallbackID] = useState(
    '60d241394ed33bf4adc86e87'
  );
  console.log(`id: ${callbackIdToUpdate}`);

  const [recalculate] = useMutation(RECALCULATE_CALLBACK_MUTATION, {
    variables: {
      callbackID: '60d241394ed33bf4adc86e87',
    },
  });
  async function recalculateCallback() {
    console.log(`id recalc: ${callbackIdToUpdate}`);
    recalculate();
  }

  return { recalculateCallback, setCallbackID };
}
