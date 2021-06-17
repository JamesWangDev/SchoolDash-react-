import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useUser } from '../User';
import Loading from '../Loading';
import { useGQLQuery } from '../../lib/useGqlQuery';

const TeacherMessagesStyles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 2px solid var(--blue);
  border-radius: 2rem;

  .messageContainer {
    display: flex;
  }
  .singleMessage {
    margin: 1rem;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: 2px 2px var(--blue);
    background: linear-gradient(
      to top right,
      var(--blueTrans),
      var(--redTrans)
    );
  }
  .needsUpdate {
    background: linear-gradient(208deg, var(--red), var(--redTrans)));
    background-size: 400% 400%;

    -webkit-animation: AnimationName 3s ease infinite;
    -moz-animation: AnimationName 3s ease infinite;
    animation: AnimationName 3s ease infinite;
    box-shadow: 2px 2px var(--Red);
  }
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 57%;
    }
    50% {
      background-position: 100% 44%;
    }
    100% {
      background-position: 0% 57%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 57%;
    }
    50% {
      background-position: 100% 44%;
    }
    100% {
      background-position: 0% 57%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 57%;
    }
    50% {
      background-position: 100% 44%;
    }
    100% {
      background-position: 0% 57%;
    }
  }
`;

const GET_MESSAGES = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        block1Assignment
        block1AssignmentLastUpdated
        block2Assignment
        block2AssignmentLastUpdated
        block3Assignment
        block3AssignmentLastUpdated
        block4Assignment
        block4AssignmentLastUpdated
        block5Assignment
        block5AssignmentLastUpdated
      }
    }
  }
`;

export default function TeacherAssignments() {
  const me = useUser();
  if (!me) return <Loading />;

  // get messages data
  const { data, isLoading, error, refetch } = useGQLQuery(
    'myTeacherMessages',
    GET_MESSAGES
  );
  if (isLoading) return <Loading />;
  const messages = data.authenticatedItem;
  //   const num = 1;
  return (
    <TeacherMessagesStyles>
      <h3>Class Messages</h3>
      {/* <pre>{JSON.stringify(messages, ',', 4)}</pre> */}

      <div className="messageContainer">
        {[...Array(5)].map((e, i) => {
          const num = i + 1;
          console.log(num);
          const today = new Date();
          const messageDate = new Date(
            messages[`block${num}AssignmentLastUpdated`]
          );
          const late = today - messageDate > 600000000;
          console.log(late);
          return (
            // <p>sadfasdf</p>
            <div
              className={late ? 'singleMessage needsUpdate' : 'singleMessage'}
            >
              <h4>Block {num}</h4>
              <p>{messages[`block${num}Assignment`]}</p>
              <p>
                {
                  new Date(messages[`block${num}AssignmentLastUpdated`])
                    .toLocaleString()
                    .split(',')[0]
                }
              </p>
            </div>
          );
        })}
      </div>
    </TeacherMessagesStyles>
  );
}
