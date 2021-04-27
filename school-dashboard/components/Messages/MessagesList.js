import React from 'react';
import styled from 'styled-components';
import SingleMessageInList from './SingleMessageInList';

const MessageListStyles = styled.div`
  position: fixed; /* Stay in place */
  z-index: 4; /* Sit on top */
  left: 10%;
  top: 10%;
  width: 80%; /* Full width */
  height: 80%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
  border-radius: 2rem;
  div {
    display: flex;
    flex-direction: column;
  }
  h3 {
    color: white;
  }
`;

export default function MessagesList({ messages }) {
  console.log(messages);
  return (
    <MessageListStyles>
      {messages.map((message) => {
        console.log(message);
        return <SingleMessageInList message={message} />;
      })}
    </MessageListStyles>
  );
}
