import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUser } from '../User';

const MARK_MESSAGE_READ_MUTATION = gql`
  mutation MARK_MESSAGE_READ_MUTATION($id: ID!) {
    createMessage(id: $id, data: { read: true }) {
      id
    }
  }
`;

export default function useCreateMessage() {
  //   console.log(`message: ${JSON.stringify(message)}`);

  const [markMessageRead] = useMutation(MARK_MESSAGE_READ_MUTATION, {});

  return markMessageRead;
}
