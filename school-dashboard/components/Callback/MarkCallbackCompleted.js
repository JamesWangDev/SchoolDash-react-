import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useQueryClient } from 'react-query';
import { useUser } from '../User';

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
  if (me.id === callback.teacher.id) {
    return (
      <div>
        <button
          type="button"
          onClick={async () => {
            console.log('marking completed');
            await markCompleted();
            queryClient.refetchQueries();
          }}
        >
          Mark Completed {daysLate} Days overdue
        </button>
      </div>
    );
  }
  return null;
}
