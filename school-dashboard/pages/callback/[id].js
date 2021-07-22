import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';
import { useUser } from '../../components/User';
import CallbackCardMessages from '../../components/Callback/CallbackCardMessages';
import MarkCallbackCompleted from '../../components/Callback/MarkCallbackCompleted';
import { SmallGradientButton } from '../../components/styles/Button';
import CallbackEditor from '../../components/Callback/CallbackEditor';
import DuplicateCallback from '../../components/Callback/DuplicateCallback';

const GET_SINGLE_CALLBACK = gql`
  query GET_SINGLE_CALLBACK($id: ID!) {
    Callback(where: { id: $id }) {
      id
      title
      description
      daysLate
      dateAssigned
      dateCompleted
      messageFromTeacher
      messageFromStudent
      link

      teacher {
        name
        id
      }
      student {
        id
        name
        averageTimeToCompleteCallback
        callbackCount
        email
        parent {
          email
          id
          name
        }
      }
    }
  }
`;

const SingleCallbackStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  background: linear-gradient(to top left, var(--redTrans), var(--blueTrans));
  p {
    margin: 5px 0;
  }
  h1 {
    border-radius: 2rem;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
    padding: 0.25rem 1.25rem;
    margin-top: 10px;
    margin-bottom: 0;
    background: linear-gradient(
      to bottom left,
      var(--redTrans),
      var(--blueTrans)
    );
  }
  h2 {
    /* font-size: 1.5rem; */
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default function SingleCallbackPage({ query }) {
  const me = useUser();
  const { data, isLoading, error, refetch } = useGQLQuery(
    `SingleCallback-${query.id}`,
    GET_SINGLE_CALLBACK,
    {
      id: query.id,
    }
  );
  const [editing, setEditing] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  if (isLoading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  const callback = data?.Callback;
  const dateAssigned = new Date(callback?.dateAssigned).toLocaleDateString();
  const dateCompleted = callback.dateCompleted
    ? new Date(callback?.dateCompleted).toLocaleDateString()
    : 'Not Yet Completed';
  return (
    <SingleCallbackStyles>
      <h1>
        {me.id === callback.teacher.id && (
          <SmallGradientButton
            onClick={() => {
              setEditing(!editing);
            }}
          >
            Edit
          </SmallGradientButton>
        )}
        {callback.title}{' '}
        {me.id === callback.teacher.id && (
          <SmallGradientButton
            onClick={() => {
              setDuplicating(!duplicating);
            }}
          >
            Duplicate
          </SmallGradientButton>
        )}
      </h1>
      {!editing && !duplicating && (
        <>
          <h2>Assigned By: {callback.teacher.name}</h2>
          <h2>{callback.student.name}</h2>
          <p>
            Average Time For {callback.student.name} To Complete Callback:{' '}
            {callback.student.averageTimeToCompleteCallback
              ? callback.student.averageTimeToCompleteCallback
              : 'N/A'}{' '}
            Days
          </p>
          <p>{callback.description}</p>
          <p>
            Assigned on {dateAssigned} - Completed on {dateCompleted}
          </p>
          {callback.link && (
            <Link
              href={
                callback.link?.startsWith('http')
                  ? callback.link
                  : `http://${callback.link}`
              }
            >
              <a className="link">
                {callback.link ? `Link to ${callback.link}` : ''}
              </a>
            </Link>
          )}
          <div>
            <CallbackCardMessages callback={callback} me={me} />
          </div>
          {!callback.dateCompleted && (
            <MarkCallbackCompleted callback={callback} />
          )}{' '}
        </>
      )}

      {/* editing form */}
      {editing && (
        <>
          <CallbackEditor
            callback={callback}
            refetch={refetch}
            setEditing={setEditing}
          />
        </>
      )}
      {duplicating && (
        <>
          <DuplicateCallback
            callback={callback}
            setDuplicating={setDuplicating}
          />
        </>
      )}
    </SingleCallbackStyles>
  );
}
