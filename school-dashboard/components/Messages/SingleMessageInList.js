import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useQueryClient } from 'react-query';
import useMarkMessageRead from './MarkMessageRead';
import useDeleteMessage from './useDeleteMessage';

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
  const markMessageRead = useMarkMessageRead();
  const deleteMessage = useDeleteMessage();
  const queryClient = useQueryClient();
  const [viewMessage, setViewMessage] = useState(false);
  const date = new Date(message.sent).toLocaleDateString();
  console.log(message);
  return (
    <MessageContainerStyles key={message.id}>
      <h3
        className={message.read ? '' : 'unread'}
        onClick={async () => {
          setViewMessage(!viewMessage);
          const res = await markMessageRead({ variables: { id: message.id } });
          // if (res.data) {
          //   queryClient.refetchQueries();
          // }
        }}
      >
        {message.subject} -
        <span
          onClick={(e) => {
            markMessageRead({ variables: { id: message.id } });
          }}
        >
          {message.read ? 'read' : 'unread'}
        </span>
      </h3>
      <div className={viewMessage ? 'show' : 'hide'}>
        <p>{message.message}</p>
        <p>{date}</p>
        {message.link && <Link href={message.link}>View</Link>}
        <button
          type="button"
          onClick={async () => {
            const res = await deleteMessage({ variables: { id: message.id } });
            queryClient.refetchQueries('myMessages');
          }}
        >
          Delete
        </button>
      </div>
    </MessageContainerStyles>
  );
}
