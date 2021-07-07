import styled from 'styled-components';
import { TeacherMessagesStyles } from './TeacherAssignments';

export default function AssignmentViewCards({ assignments }) {
  return (
    <TeacherMessagesStyles>
      <h3>Current Class Assignments</h3>

      <div className="messageContainer">
        {[...Array(5)].map((e, i) => {
          const num = i + 1;
          const today = new Date();
          const messageDate = new Date(
            assignments[`block${num}AssignmentLastUpdated`] || ''
          );
          const newUpdate = today - messageDate < 86400000;
          return (
            <div
              className={
                newUpdate ? 'singleMessage needsUpdate' : 'singleMessage'
              }
              key={`key ${num}`}
            >
              <h4>Block {num}</h4>
              <p>{assignments[`block${num}ClassName`]}</p>
              <p>{assignments[`block${num}Assignment`]}</p>
              {/* <p>
                {
                  new Date(assignments[`block${num}AssignmentLastUpdated`])
                    .toLocaleString()
                    .split(',')[0]
                }
              </p> */}
            </div>
          );
        })}
      </div>
    </TeacherMessagesStyles>
  );
}
