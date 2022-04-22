import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const MARK_MESSAGE_READ_MUTATION = gql`
  mutation MARK_MESSAGE_READ_MUTATION($id: ID!) {
    deleteMessage(where: {id: $id}) {
      id
    }
  }
`;

export default function useMarkMessageRead() {
  //   console.log(`message: ${JSON.stringify(message)}`);

  const [deleteMessage] = useMutation(MARK_MESSAGE_READ_MUTATION, {});

  return deleteMessage;
}
