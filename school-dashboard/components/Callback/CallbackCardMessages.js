import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
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

const AnimatedInput = styled.p`
  position: relative;
  /* width: 100%; */
  /* height: 100%; */
  border: none;
  /* border-bottom: 1px solid #e1e1e1; */
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #4d4d4d;
  text-align: center;
  transition: all 0.3s;
  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #4d4d4d;
    text-align: center;
    transition: all 0.3s;
  }
  .inputUpdating {
    animation: color-change 0.5s infinite;
    @keyframes color-change {
      0% {
        color: var(--red);
      }
      50% {
        color: var(--blue);
        font-size: 16px;
      }
      100% {
        color: var(--red);
      }
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
            <AnimatedInput>
              Student:
              <span> {callback.messageFromStudent || '----'}</span>
            </AnimatedInput>
          )}
          {!isTeacher && (
            <AnimatedInput>
              Teacher:
              <span> {callback.messageFromTeacher || '----'}</span>
            </AnimatedInput>
          )}
          {isStudent && (
            <>
              <AnimatedInput>
                Student Message:
                <input
                  id={`student - ${callback.id}`}
                  placeholder="Message from Student"
                  value={studentMessage}
                  className={loading ? 'inputUpdating' : ''}
                  onChange={(e) => {
                    //   console.log(e.target.value);
                    setStudentMessage(e.target.value);
                  }}
                />
              </AnimatedInput>
            </>
          )}
          {isTeacher && (
            <>
              <AnimatedInput>
                Teacher:
                <input
                  id={`teacher-${callback.id}`}
                  placeholder="Message from Teacher"
                  value={teacherMessage}
                  className={loading ? 'inputUpdating' : ''}
                  onChange={(e) => {
                    //   console.log(e.target.value);
                    setTeacherMessage(e.target.value);
                  }}
                />
              </AnimatedInput>
            </>
          )}
        </fieldset>
      </FormGroupStyles>
    </form>
  );
}
