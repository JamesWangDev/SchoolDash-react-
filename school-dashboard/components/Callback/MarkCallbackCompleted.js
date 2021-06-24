import gql from 'graphql-tag';
import { useUser } from '../User';

const MARK_CALLBACK_COMPLETED = gql`
  mutation($id: ID!, $dateCompleted: String!) {
    updateCallback(
      id: "60d313224ed33bf4adc86e91"
      data: { dateCompleted: "12/12/2021" }
    ) {
      id
    }
  }
`;

export default function MarkCallbackCompleted({ callback }) {
  const me = useUser();
  const today = new Date();
  const dateAssigned = new Date(callback.dateAssigned);
  const daysLate = Math.round((today - dateAssigned) / 1000 / 60 / 60 / 24);
  //   console.log(`late: ${daysLate}`);
  if (me.id === callback.teacher.id) {
    return (
      <div>
        <button type="button">Mark Completed {daysLate} Days overdue</button>
      </div>
    );
  }
  return null;
}
