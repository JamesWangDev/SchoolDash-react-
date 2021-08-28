import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUser } from '../User';

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION(
    $subject: String!
    $message: String!
    $link: String!
    $sender: ID!
    $receiver: ID!
  ) {
    createMessage(
      data: {
        subject: $subject
        message: $message
        sender: { connect: { id: $sender } }
        receiver: { connect: { id: $receiver } }
        link: $link
      }
    ) {
      id
    }
  }
`;

export default function useCreateMessage() {
  const queryClient = useQueryClient();
  const me = useUser();
  const [message, createMessage] = useState();
  //   console.log(`message: ${JSON.stringify(message)}`);

  const [createMessageMutation] = useMutation(CREATE_MESSAGE_MUTATION, {
    variables: {
      subject: message?.subject,
      message: message?.message,
      sender: me?.id,
      receiver: message?.receiver,
      link: message?.link,
    },
  });
  useEffect(() => {
    if (message) {
      // console.log('creating message');
      // console.log(`message: ${JSON.stringify(message)}`);
      createMessageMutation();
      setTimeout(() => {
        queryClient.refetchQueries();
      }, 1000);
    }
  }, [message]);

  return createMessage;
}
