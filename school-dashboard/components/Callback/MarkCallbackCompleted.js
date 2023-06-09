import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useUser } from '../User';
import useRecalculateCallback from './recalculateCallback';
import { SmallGradientButton } from '../styles/Button';
import toast from 'react-hot-toast';

const MARK_CALLBACK_COMPLETED = gql`
  mutation MARK_CALLBACK_COMPLETED(
    $id: ID!
    $dateCompleted: DateTime!
    $daysLate: Int!
  ) {
    updateCallback(
      where: {id: $id}
      data: { dateCompleted: $dateCompleted, daysLate: $daysLate }
    ) {
      id
    }
  }
`;


const DeleteCallbackButtonStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  transition: all 0.8s ease-in-out;

  .deleting {
    transform: scale(0.1);
    opacity: 0;
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
        dateCompleted: today,
        daysLate,
      },
    }
  );

  //   console.log(`late: ${daysLate}`);
  if (me?.id === callback.teacher.id) {
    return (
      <DeleteCallbackButtonStyles>
        <SmallGradientButton
          type="button"
          className={loading ? 'deleting' : ''}
          onClick={async () => {
            // console.log('marking completed');
            const res = await markCompleted();
            if(res){
              toast.success('Callback marked as completed');
              setCallbackID(res.data.updateCallback.id);
              
            }
            // console.log(res.data.updateCallback.id);
            queryClient.refetchQueries();
          }}
        >
          Mark Completed {daysLate} Days overdue
        </SmallGradientButton>
      </DeleteCallbackButtonStyles>
    );
  }
  return null;
}
