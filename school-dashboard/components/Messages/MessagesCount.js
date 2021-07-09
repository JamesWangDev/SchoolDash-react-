import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';
import MessagesList from './MessagesList';
import Loading from '../Loading';

const MessageButtonStyles = styled.button`
  position: fixed;
  display: flex;
  top: 5px;
  right: 5px;
  z-index: 20;
  /* height: 100%; */
  border: none;
  background: none;
  color: white;
`;
const AnimationStyles = styled.span`
  margin-top: 50px;
  margin-right: 50px;
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

const Dot = styled.div`
  background: var(--blue);
  color: var(--red);
  font-size: 2rem;
  border-radius: 500px;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const MY_CALLBACK_ASSIGNMENTS = gql`
  query MY_CALLBACK_ASSIGNMENTS($me: ID) {
    allMessages(sortBy: sent_ASC, where: { receiver: { id: $me } }) {
      id
      subject
      message
      read
      link
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
  if (isLoading) return <Loading />;
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="count"
          className="count"
          key={unread}
          timeout={{ enter: 400, exit: 400 }}
        >
          <>
            <MessageButtonStyles
            // type="button"
            // onClick={() => {
            //   setViewAllMessages(!viewAllMessages);
            // }}
            >
              {unread > 0 && 'unread messages'}
              <Dot
                type="button"
                onClick={() => {
                  setViewAllMessages(!viewAllMessages);
                }}
              >
                {unread}
              </Dot>
            </MessageButtonStyles>
            {viewAllMessages && <MessagesList messages={data?.allMessages} />}
          </>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
