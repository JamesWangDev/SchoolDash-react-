import React from 'react';

export default function MessagesList({ messages }) {
  console.log(messages);
  return (
    <div>
      {messages.map((message) => {
        console.log(message);
        return (
          <div>
            <p>{message.subject}</p>
          </div>
        );
      })}
    </div>
  );
}
