import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton from '../styles/Button';
import SearchForUserName from '../SearchForUserName';
import Form from '../styles/Form';
import useForm from '../../lib/useForm';
import { useUser } from '../User';
import useCreateMessage from '../Messages/useCreateMessage';
import useRecalculatePBIS from './useRecalculatePbis';

const CardButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  transition: ease-in-out 1s;
`;

const CardFormContainerStyles = styled.div`
  z-index: 1;
  text-shadow: 1px 1px 2px var(--red);
  position: relative;
  .visible {
    /* background: red; */
    opacity: 1;
    transition: all ease-in-out 0.6s;
    /* left: -100px; */
    /* top: 50px; */
    transform: scale(1) translateX(-150px) translateY(50px);
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
    background: linear-gradient(to top left, var(--red), var(--blue));
  }
  button:disabled,
  button[disabled] {
    /* border: 1px solid red; */
    /* background-color: #cccccc; */
    color: var(--red);
  }
`;

const CREATE_PBIS_CARD = gql`
  mutation CREATE_QUICK_PBIS(
    $teacher: ID!
    $student: ID!
    $category: String
    $message: String
  ) {
    createPbisCard(
      data: {
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        category: $category
        cardMessage: $message
      }
    ) {
      id
      student {
        name
      }
      teacher {
        name
      }
    }
  }
`;

function CardForm({ visible, hide }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    message: '',
  });
  const me = useUser();
  const teacher = me.id;
  const [studentCardIsFor, setStudentCardIsFor] = useState();
  // console.log(studentCardIsFor);

  const [createCard, { loading, error, data }] = useMutation(CREATE_PBIS_CARD, {
    variables: {
      teacher,
      student: studentCardIsFor?.userId,
      message: inputs.message,
      category: inputs.category,
    },
  });
  const { recalculatePbisFromId } = useRecalculatePBIS();
  const createMessage = useCreateMessage();
  if (error) {
    console.log(error);
    return <p>{error.message}</p>;
  }
  console.log(studentCardIsFor);
  return (
    <CardFormContainerStyles>
      <div className={visible}>
        <Form>
          <label>New PBIS Card</label>

          <SearchForUserName
            name="studentName"
            // value={inputs.studentName}
            updateUser={setStudentCardIsFor}
            userType="isStudent"
          />
          <label htmlFor="message">
            message
            <textarea
              type="text"
              id="message"
              name="message"
              placeholder="student Message"
              value={inputs.message}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="respect">
            <input
              type="radio"
              name="category"
              id="respect"
              value="respect"
              onChange={handleChange}
            />
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
            Responsibility
          </label>
          <label htmlFor="perseverance">
            <input
              type="radio"
              name="category"
              id="perseverance"
              value="perseverance"
              onChange={handleChange}
            />
            Perseverance
          </label>
          <GradientButton
            type="submit"
            disabled={!studentCardIsFor || !inputs.category}
            onClick={async (e) => {
              e.preventDefault();
              // console.log(inputs);
              const res = await createCard();
              // console.log(`res res `);
              // console.log(res?.data?.createPbisCard.id);
              createMessage({
                subject: 'New PBIS Card',
                message: `you received a new PBIS Card from ${me.name} for ${inputs.category}`,
                receiver: studentCardIsFor.userId,
                link: `/pbis/${res?.data?.createPbisCard.id}`,
              });
              recalculatePbisFromId(studentCardIsFor.userId);
              // clearForm();
              // resetForm();
              // setStudentCardIsFor(null);
              hide(false);
            }}
          >
            Give {studentCardIsFor && `${studentCardIsFor.userName} `}A PBIS
            Card
          </GradientButton>
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

      <CardForm
        visible={displayCardForm ? 'visible' : 'invisible'}
        hide={setDisplayCardForm}
      />
    </CardButtonContainer>
  );
}
