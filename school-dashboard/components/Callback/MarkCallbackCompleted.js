import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useQueryClient } from 'react-query';
import { useUser } from '../User';
import useRecalculateCallback from './recalculateCallback';
import { SmallGradientButton } from '../styles/Button';

const MARK_CALLBACK_COMPLETED = gql`
  mutation MARK_CALLBACK_COMPLETED(
    $id: ID!
    $dateCompleted: String!
    $daysLate: Int!
  ) {
    updateCallback(
      id: $id
      data: { dateCompleted: $dateCompleted, daysLate: $daysLate }
    ) {
      id
    }
  }
`;

export default function MarkCallbackCompleted({ callback }) {
  const queryClient = useQueryClient();
  const me = useUser();
  const today = new Date();
  const { setCallbackID } = useRecalculateCallback();
  const dateAssigned = new Date(callback.dateAssigned);
  const daysLate = Math.round((today - dateAssigned) / 1000 / 60 / 60 / 24);
  const [markCompleted, { loading, error }] = useMutation(
    MARK_CALLBACK_COMPLETED,
    {
      variables: {
        id: callback.id,
        dateCompleted: today.toISOString(),
        daysLate,
      },
    }
  );

  //   console.log(`late: ${daysLate}`);
  if (me?.id === callback.teacher.id) {
    return (
      <div>
        <SmallGradientButton
          type="button"
          onClick={async () => {
            console.log('marking completed');
            const res = await markCompleted();
            console.log(res.data.updateCallback.id);
            setCallbackID(res.data.updateCallback.id);
            queryClient.refetchQueries();
          }}
        >
          Mark Completed {daysLate} Days overdue
        </SmallGradientButton>
      </div>
    );
  }
  return null;
}
