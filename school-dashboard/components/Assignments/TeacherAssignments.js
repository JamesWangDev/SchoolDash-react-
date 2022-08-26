import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { useUser } from "../User";
import Loading from "../Loading";
import { useGQLQuery } from "../../lib/useGqlQuery";
import MessageUpdater from "./AssignmentUpdater";

export const TeacherMessagesStyles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 2px solid var(--blue);
  border-radius: 2rem;
  margin: 10px;
  justify-content: space-around;
  width: 100%;
  h3{
    margin: .5rem;
  }
  
  .messageContainer {
    display: grid;
    grid-template-columns: repeat(8, auto);

    @media (max-width: 600px){
   grid-template-columns: 1fr;
  }
  }
  .singleMessage {
    display: flex;
    flex-direction: column;
    margin: .5rem;
    padding: .5rem;
    border-radius: 2rem;
    box-shadow: 2px 2px var(--blue);
    background: linear-gradient(
      to top right,
      var(--blueTrans),
      var(--redTrans)
    );
    font-size: 1.2rem;
    h4, p{
      margin: 0px;
    }
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
        block1ClassName
        block1AssignmentLastUpdated
        block2Assignment
        block2ClassName
        block2AssignmentLastUpdated
        block3Assignment
        block3ClassName
        block3AssignmentLastUpdated
        block4Assignment
        block4ClassName
        block4AssignmentLastUpdated
        block5Assignment
        block5ClassName
        block5AssignmentLastUpdated
        block6Assignment
        block6ClassName
        block6AssignmentLastUpdated
        block7Assignment
        block7ClassName
        block7AssignmentLastUpdated
        block8Assignment
        block8ClassName
        block8AssignmentLastUpdated
      }
    }
  }
`;

export default function TeacherAssignments() {
  const me = useUser();
  const [showUpdater, setShowUpdater] = useState(false);
  const [block, setBlock] = useState();

  // get messages data
  const { data, isLoading, error, refetch } = useGQLQuery(
    "myTeacherMessages",
    GET_MESSAGES
  );
  if (!me) return <Loading />;
  if (isLoading) return <Loading />;
  const assignments = data.authenticatedItem || {};
  return (
    <>
      {showUpdater && (
        <MessageUpdater
          block={block}
          assignments={assignments}
          hide={setShowUpdater}
          refetch={refetch}
        />
      )}
      <TeacherMessagesStyles>
        <h3>Current Class Assignments</h3>

        <div className="messageContainer">
          {[...Array(8)].map((e, i) => {
            const num = i + 1;
            const today = new Date();
            const messageDate = new Date(
              assignments[`block${num}AssignmentLastUpdated`] || ""
            );
            const late = today - messageDate > 600000000;
            return (
              <div
                className={late ? "singleMessage needsUpdate" : "singleMessage"}
                key={`key ${num}`}
                onClick={() => {
                  setBlock(num);
                  setShowUpdater(true);
                }}
              >
                <h4>Block {num}</h4>
                <p>{assignments[`block${num}ClassName`]}</p>
                <p>{assignments[`block${num}Assignment`]}</p>
                <p>
                  {
                    new Date(assignments[`block${num}AssignmentLastUpdated`])
                      .toLocaleString()
                      .split(",")[0]
                  }
                </p>
              </div>
            );
          })}
        </div>
      </TeacherMessagesStyles>
    </>
  );
}
