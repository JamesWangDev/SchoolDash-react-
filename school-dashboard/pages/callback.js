import gql from 'graphql-tag';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import DisplayError from '../components/ErrorMessage';
import CallbackTable from '../components/Callback/CallbackTable';

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
      mesageFromStudent
      messageFromTeacher
    }
  }
`;

export default function Callback() {
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
  const callbacks = data.allCallbacks;
  return (
    <div>
      <p> This is the Callback page</p>
      <p>
        You have {callbacks.length} item{callbacks.length === 1 ? '' : 's'} on
        Callback{' '}
      </p>
      <CallbackTable callbacks={callbacks} />
    </div>
  );
}
