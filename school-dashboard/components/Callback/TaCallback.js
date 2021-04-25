import gql from 'graphql-tag';
import Toggle from 'react-toggle';
import { useState } from 'react';
import { useUser } from '../User';
import DisplayError from '../ErrorMessage';
import CallbackTable from './CallbackTable';
import 'react-toggle/style.css';
import CallbackCards from './CallbackCards';
import { FormContainerStyles } from '../styles/Form';
import { useGQLQuery } from '../../lib/useGqlQuery';

const MY_CALLBACK_ASSIGNMENTS = gql`
  query MY_CALLBACK_ASSIGNMENTS($taTeacher: ID!) {
    allCallbacks(
      sortBy: dateAssigned_ASC
      where: { student: { taTeacher: { id: $taTeacher } } }
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
    }
  }
`;

export default function TaCallbacks() {
  const me = useUser();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { data, isLoading, error, refetch } = useGQLQuery(
    'myCallbacks',
    MY_CALLBACK_ASSIGNMENTS,
    {
      taTeacher: me?.id,
    },
    {
      enabled: !!me,
    }
  );

  if (!me) return <p>Please Log In</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <DisplayError>{error.message}</DisplayError>;
  const callbacks = data.allCallbacks.filter((callback) => {
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
          <span> Show Callbacks As Table</span>
          <Toggle
            checked={showTable}
            onChange={() => setShowTable(!showTable)}
          />
        </label>
      </FormContainerStyles>
      {showTable && <CallbackTable callbacks={callbacks} />}

      {!showTable && <CallbackCards callbacks={callbacks} />}
    </div>
  );
}
