import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
    height: min-content;
  }
  .unread {
    font-size: 3rem;
  }
  h3 {
    font-size: 2rem;
  }
  a {
    :before {
      display: none;
    }
  }
`;

export default function SingleMessageInList({ message }) {
  const [viewMessage, setViewMessage] = useState(false);
  return (
    <MessageContainerStyles key={message.id}>
      <h3
        className={message.read ? '' : 'unread'}
        onClick={() => {
          setViewMessage(!viewMessage);
        }}
      >
        {message.subject}
      </h3>
      <div className={viewMessage ? 'show' : 'hide'}>
        <p>{message.message}</p>
        {message.link && <Link href={message.link}>View</Link>}
      </div>
    </MessageContainerStyles>
  );
}
