import {useState} from 'react'
import styled from 'styled-components'
import { useUser } from '../User';
import { UPDATE_CALLBACK_MESSAGES_MUTATION } from './CallbackCardMessages';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { QueryClient, useQueryClient } from 'react-query';

const CallbackMessageTableStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: flex-start;
    align-items: flex-start;
    /* margin-bottom: .25rem; */
    .messageContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-between;
        /* background-color: red; */
        margin: 3px;
        padding: .1rem .5rem;
        border-radius: 5px;
        font-size: 1.25rem;
        line-height: 1.5rem;
        /* border: 1px solid black; */
        border-radius: .5rem;
    span{
        font-size: 1.5rem;
        line-height: 1.5rem;
        padding: .1rem .5rem;
    }
    .date {
        font-size: .75rem;
    }
    .message {
        font-size: 1.3rem;
    }

    }
    textArea {
        width: 100%;
        padding: 0rem .5rem;
        margin: 0;
        background-color: inherit;
        color: inherit;
        overflow: hidden;
    }
 `;

export default function CallbackMessagesForTable({callbackItem}) {
    // console.log(callbackItem)
    const me = useUser();
    const isTeacher = me.id === callbackItem.teacher.id;
    const isStudent = me.id === callbackItem.student.id;
    const currentDate = new Date().toLocaleDateString();
    const [teacherMessage, setTeacherMessage] = useState(callbackItem.messageFromTeacher || '');
    const [studentMessage, setStudentMessage] = useState(callbackItem.messageFromStudent || '');
    const [teacherMessageDate, setTeacherMessageDate] = useState(
        callbackItem.messageFromTeacherDate || ''
      );
    const [studentMessageDate, setStudentMessageDate] = useState(
        callbackItem.messageFromStudentDate || ''
      );
    const [updateCallback] = useMutation(
    UPDATE_CALLBACK_MESSAGES_MUTATION,
    {
        variables: {
        id: callbackItem.id,
        messageFromTeacher: teacherMessage,
        messageFromTeacherDate: teacherMessageDate,
        messageFromStudent: studentMessage,
        messageFromStudentDate: studentMessageDate,
        },
    }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateCallback();
            if (res) {
              toast.success(
                `Updated Callback Message for ${callbackItem.student.name}`
              );
            }
      };

    const submitOnEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
        handleSubmit(e);
    }
    };

  return (
    <CallbackMessageTableStyles>
        <div className='messageContainer'>
            <span>Teacher</span>
            {!isTeacher && 
                <>
                    <span className='message'>{teacherMessage}</span>
                    <span className='date'>{teacherMessageDate}</span>
                </>
            }
            {isTeacher &&
                <>
                    <textarea 
                        type='text' 
                        placeholder='message'
                        value={teacherMessage}
                        title="Enter to submit change, Shift-Enter for new line"
                        onKeyDown={submitOnEnter}
                        onChange={(e) => {
                            setTeacherMessage(e.target.value)
                            setTeacherMessageDate(currentDate)
                        }}
                    />
                    <span className='date'>{teacherMessageDate}</span>
                </>
            }
        </div>
        <div className='messageContainer'>
            <span>Student</span>
            {!isStudent &&
                <>
                    <span className='message'>{studentMessage}</span>
                    <span className='date'>{studentMessageDate}</span>
                </>
            }
            {isStudent &&
                <>
                    <textarea
                        type='text'
                        placeholder='message'
                        value={studentMessage}
                        title="Enter to submit change, Shift-Enter for new line"
                        onKeyDown={submitOnEnter}
                        onChange={(e) => {
                            setStudentMessage(e.target.value)
                            setStudentMessageDate(currentDate)
                        }}
                    />
                    <span className='date'>{studentMessageDate}</span>
                </>
            }
        </div>
    </CallbackMessageTableStyles>
  )
}
