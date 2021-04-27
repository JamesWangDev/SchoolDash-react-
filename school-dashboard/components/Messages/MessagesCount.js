import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';
import MessagesList from './MessagesList';

const MessageButtonStyles = styled.button`
  height: 100%;
  border: 1px solid red;
  background: green;
`;

const MY_CALLBACK_ASSIGNMENTS = gql`
  query MY_CALLBACK_ASSIGNMENTS($me: ID) {
    allMessages(sortBy: sent_ASC, where: { receiver: { id: $me } }) {
      id
      subject
      message
      read
      sender {
        id
        name
      }
    }
    _allMessagesMeta(
      where: { receiver: { id: "60398efe451aeb5fdfb711dd" }, read: false }
    ) {
      count
    }
  }
`;

export default function MessagesCount() {
  const me = useUser();
  const { data, isLoading, error, refetch } = useGQLQuery(
    'myMessages',
    MY_CALLBACK_ASSIGNMENTS,
    {
      me: me?.id,
    },
    {
      enabled: !!me,
      refetchInterval: 300000,
    }
  );
  const unread = data?._allMessagesMeta?.count;
  const [viewAllMessages, setViewAllMessages] = useState(false);
  if (isLoading) return <p>..</p>;
  return (
    <div>
      <MessageButtonStyles
        type="button"
        onClick={() => {
          setViewAllMessages(!viewAllMessages);
        }}
      >
        {unread} unread messages
      </MessageButtonStyles>
      {viewAllMessages && <MessagesList messages={data?.allMessages} />}
    </div>
  );
}
