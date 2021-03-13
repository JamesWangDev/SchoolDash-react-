import gql from 'graphql-tag';
import Toggle from 'react-toggle';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import DisplayError from '../components/ErrorMessage';
import CallbackTable from '../components/Callback/CallbackTable';
import 'react-toggle/style.css';
import { useState } from 'react';

const MY_CALLBACK_ASSIGNMENTS = gql`
  query MY_CALLBACK_ASSIGNMENTS($teacher: ID) {
    allCallbacks(where: { teacher: { id: $teacher } }) {
      teacher {
        id
        name
      }
      student {
        name
        id
      }
      link
      description
      title
      dateAssigned
      dateCompleted
      messageFromStudent
      messageFromTeacher
    }
  }
`;

export default function Callback() {
  const [showCompleted, setShowCompleted] = useState(false);
  const me = useUser();
  if (!me) return <p>Please Log In</p>;
  const { data, isLoading, error } = useGQLQuery(
    'myCallbacks',
    MY_CALLBACK_ASSIGNMENTS,
    {
      teacher: me?.id,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  const callbacks = data.allCallbacks.filter((callback) => {
    if (showCompleted) return true;
    return !callback.dateCompleted;
  });
  return (
    <div>
      <label>
        <Toggle
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <span>Show Completed</span>
      </label>
      <CallbackTable callbacks={callbacks} />
    </div>
  );
}
