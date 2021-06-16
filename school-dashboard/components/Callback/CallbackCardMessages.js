import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Form, { FormGroupStyles } from '../styles/Form';

const UPDATE_CALLBACK_MESSAGES_MUTATION = gql`
  mutation UPDATE_CALLBACK_MESSAGES_MUTATION(
    $id: ID!
    $messageFromTeacher: String
    $messageFromStudent: String
  ) {
    updateCallback(
      id: $id
      data: {
        messageFromTeacher: $messageFromTeacher
        messageFromStudent: $messageFromStudent
      }
    ) {
      id
    }
  }
`;

export default function CallbackCardMessages({ me, callback }) {
  const isTeacher = me.id === callback.teacher.id;
  const isStudent = me.id === callback.student.id;
  const [teacherMessage, setTeacherMessage] = useState(
    callback.messageFromTeacher || ''
  );
  const [studentMessage, setStudentMessage] = useState(
    callback.messageFromStudent || ''
  );

  const [updateCallback, { loading, error, data }] = useMutation(
    UPDATE_CALLBACK_MESSAGES_MUTATION,
    {
      variables: {
        id: callback.id,
        messageFromTeacher: teacherMessage,
        messageFromStudent: studentMessage,
      },
    }
  );

  return (
    <form
      //   className={showForm ? 'visible' : 'hidden'}
      // hidden={!showForm}
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the input fields to the backend:
        // console.log(inputs);
        const res = await updateCallback();
        console.log(res);
        // refetch();
        // setShowForm(false);
        // console.log(inputs);
      }}
    >
      <FormGroupStyles>
        <fieldset>
          {!isStudent && (
            <p>
              Student:
              <span> {callback.messageFromStudent || '----'}</span>
            </p>
          )}
          {!isTeacher && (
            <p>
              Teacher:
              <span> {callback.messageFromTeacher || '----'}</span>
            </p>
          )}
          {isStudent && (
            <>
              <p>
                Student Message:
                <input
                  id={`student - ${callback.id}`}
                  placeholder="Message from Teacher"
                  value={studentMessage}
                  onChange={(e) => {
                    //   console.log(e.target.value);
                    setStudentMessage(e.target.value);
                  }}
                />
              </p>
            </>
          )}
          {isTeacher && (
            <>
              <p>
                Teacher:
                <input
                  id={`teacher-${callback.id}`}
                  placeholder="Message from Teacher"
                  value={teacherMessage}
                  onChange={(e) => {
                    //   console.log(e.target.value);
                    setTeacherMessage(e.target.value);
                  }}
                />
              </p>
            </>
          )}
        </fieldset>
      </FormGroupStyles>
    </form>
  );
}
