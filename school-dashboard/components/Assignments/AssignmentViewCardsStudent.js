import styled from 'styled-components';
import { TeacherMessagesStyles } from './TeacherAssignments';

export default function AssignmentViewCardsStudent({ student }) {
  return (
    <TeacherMessagesStyles>
      <h3>Current Class Assignments</h3>

      <div className="messageContainer">
        {[...Array(5)].map((e, i) => {
          const num = i + 1;
          if (!student[`block${num}Teacher`]) {
            return (
              <div
                className="singleMessage"
                key={`key for student - ${student.id} - ${num}`}
              />
            );
          }
          const today = new Date();
          const messageDate = new Date(
            student[`block${num}Teacher`][`block${num}AssignmentLastUpdated`] ||
              ''
          );
          const newUpdate = today - messageDate < 164000000;
          // console.log(newUpdate);
          return (
            <div
              className={
                newUpdate ? 'singleMessage needsUpdate' : 'singleMessage '
              }
              key={`key for student - ${student.id} - ${num}`}
            >
              <h4>Block {num}</h4>
              <p>{student[`block${num}Teacher`].name}</p>
              <p>{student[`block${num}Teacher`][`block${num}ClassName`]}</p>
              <p>{student[`block${num}Teacher`][`block${num}Assignment`]}</p>
              <p>
                {
                  new Date(
                    student[`block${num}Teacher`][
                      `block${num}AssignmentLastUpdated`
                    ]
                  )
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
