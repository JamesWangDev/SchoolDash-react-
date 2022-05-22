import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const MARK_MESSAGE_READ_MUTATION = gql`
  mutation MARK_MESSAGE_READ_MUTATION($id: ID!) {
    updateMessage(where: {id: $id}, data: { read: true }) {
      id
    }
  }
`;

export default function useMarkMessageRead() {
  //   console.log(`message: ${JSON.stringify(message)}`);

  const [markMessageRead] = useMutation(MARK_MESSAGE_READ_MUTATION, {});

  return markMessageRead;
}
