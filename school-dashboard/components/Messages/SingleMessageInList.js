import React, { useState } from 'react';
import styled from 'styled-components';

const MessageContainerStyles = styled.div`
  margin: 0px 100px;
  div {
    background: red;
    transition: all ease 0.5s;
  }
  .hide {
    height: 0;
    overflow: hidden;
    opacity: 0;
  }
  .show {
    padding: 0;
    height: 5rem;
  }
`;

export default function SingleMessageInList({ message }) {
  const [viewMessage, setViewMessage] = useState(false);
  return (
    <MessageContainerStyles key={message.id}>
      <h3
        onClick={() => {
          setViewMessage(!viewMessage);
        }}
      >
        {message.subject}
      </h3>
      <div className={viewMessage ? 'show' : 'hide'}>
        <p>{message.message}</p>
      </div>
    </MessageContainerStyles>
  );
}
