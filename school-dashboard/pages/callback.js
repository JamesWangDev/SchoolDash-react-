import gql from 'graphql-tag';
import Toggle from 'react-toggle';
import { useState } from 'react';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import DisplayError from '../components/ErrorMessage';
import CallbackTable from '../components/Callback/CallbackTable';
import 'react-toggle/style.css';
import CallbackCards from '../components/Callback/CallbackCards';
import NewCallback from '../components/Callback/NewCallbackButton';
import { FormContainerStyles } from '../components/styles/Form';
import Loading from '../components/Loading';
import NewCallbackMultiStudent from '../components/Callback/newCallbackMultiStudent';

const MY_CALLBACK_ASSIGNMENTS = gql`
  query MY_CALLBACK_ASSIGNMENTS($teacher: ID) {
    callbacks(
      orderBy:{dateAssigned: asc}
      where: { teacher: { id: {equals: $teacher} } }
    ) {
      id
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
      messageFromStudentDate
      messageFromTeacherDate
    }
  }
  
`;

export default function Callback() {
  const me = useUser();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { data, isLoading, error, refetch } = useGQLQuery(
    'myAssignedCallbacks',
    MY_CALLBACK_ASSIGNMENTS,
    {
      teacher: me?.id,
    },
    {
      enabled: !!me,
    }
  );

  if (!me) return <p>Please Log In</p>;
  if (isLoading) return <Loading />;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  const callbacks = data.callbacks.filter((callback) => {
    if (showCompleted) return true;
    return !callback.dateCompleted;
  });
  // if (!showTable && callbacks.length > 1) {
  //   setShowTable(true);
  // } else {
  //   setShowTable(showTable);
  // }
  return (
    <div>
      <FormContainerStyles>
        <label>
          <span> Show Completed </span>
          <Toggle
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
        <label>
          <span> Show As Table </span>
          <Toggle
            checked={showTable}
            onChange={() => setShowTable(!showTable)}
          />
        </label>
        <NewCallback refetch={refetch} />
        <NewCallbackMultiStudent refetch={refetch} />
      </FormContainerStyles>
      {showTable && <CallbackTable callbacks={callbacks} />}

      {!showTable && <CallbackCards callbacks={callbacks} />}
    </div>
  );
}
