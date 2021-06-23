import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

const RECALCULATE_CALLBACK_MUTATION = gql`
  mutation RECALCULATE_CALLBACK_MUTATION($callbackId: ID!) {
    recalculateCallback(callbackID: $callbackId) {
      id
    }
  }
`;

export default function useRecalculateCallback() {
  const [callbackIdToUpdate, setCallbackID] = useState();
  console.log(`id: ${callbackIdToUpdate}`);

  const [recalculate] = useMutation(RECALCULATE_CALLBACK_MUTATION, {
    variables: {
      callbackId: callbackIdToUpdate,
    },
  });
  useEffect(() => {
    if (callbackIdToUpdate) {
      recalculate();
    }
  }, [callbackIdToUpdate]);

  async function recalculateCallback(id) {
    setCallbackID(id, () => recalculate());
    console.log(`id recalc: ${callbackIdToUpdate}`);
    // recalculate();
  }

  return { setCallbackID };
}
