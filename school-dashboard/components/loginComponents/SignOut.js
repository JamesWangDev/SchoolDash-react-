import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useQueryClient } from 'react-query';
import GradientButton from '../styles/Button';
import { CURRENT_USER_QUERY } from '../User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const queryClient = useQueryClient();
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <GradientButton
      type="button"
      onClick={async () => {
        const res = await signout();
        console.log(res)
        queryClient.refetchQueries();
        queryClient.removeQueries();
        queryClient.clear();
      }}
    >
      Sign Out
    </GradientButton>
  );
}
