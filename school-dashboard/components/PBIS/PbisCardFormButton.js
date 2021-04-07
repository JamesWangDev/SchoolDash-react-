import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '../styles/Button';
import SearchForUserName from '../SearchForUserName';
import Form from '../styles/Form';
import useForm from '../../lib/useForm';

const CardButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  transition: ease-in-out 1s;
`;

const CardFormContainerStyles = styled.div`
  .visible {
    /* background: red; */
    opacity: 1;
    transition: all ease-in-out 0.6s;
  }
  .invisible {
    opacity: 1;
    transition: all ease-in-out 0.6s;
    transform: scale(0) translateX(-100px) translateY(200px);
  }
  form {
    z-index: 1000;
    width: 300px;
    position: absolute;
    margin-left: 20px;
    border-radius: 1rem;
    background: linear-gradient(to top left, var(--redTrans), var(--blueTrans));
  }
`;

function CardForm({ visible }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    studentName: '',
    message: '',
  });
  const [studentID, setStudentID] = useState();
  console.log(studentID);
  return (
    <CardFormContainerStyles>
      <div className={visible}>
        <Form>
          <label>New PBIS Card</label>

          <SearchForUserName
            name="studentName"
            // value={inputs.studentName}
            updateID={setStudentID}
          />
          <label htmlFor="message">
            message
            <input
              type="text"
              id="message"
              name="message"
              placeholder="student Message"
              value={inputs.message}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="respect">
            <input type="radio" name="category" id="respect" value="respect" />
            Respect
          </label>
          <label htmlFor="responsibility">
            <input
              type="radio"
              name="category"
              id="responsibility"
              value="responsibility"
              onChange={handleChange}
            />
            Responsability
          </label>
          <label htmlFor="perserverance">
            <input
              type="radio"
              name="category"
              id="perserverance"
              value="perserverance"
            />
            Perserverance
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Give A PBIS Card
          </button>
        </Form>
      </div>
    </CardFormContainerStyles>
  );
}

export default function PbisCardFormButton({ teacher }) {
  const [displayCardForm, setDisplayCardForm] = useState(false);
  return (
    <CardButtonContainer>
      <GradientButton
        style={{ height: '4rem' }}
        onClick={() => {
          setDisplayCardForm(!displayCardForm);
        }}
      >
        PBIS CARD
      </GradientButton>
      <CardForm visible={displayCardForm ? 'visible' : 'invisible'} />
    </CardButtonContainer>
  );
}
