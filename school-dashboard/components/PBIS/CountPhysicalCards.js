import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { object } from 'prop-types';
import { useState } from 'react';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import { useUser } from '../User';
import useRecalculatePBIS from './useRecalculatePbis';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($cards: [PbisCardCreateInput!]!) {
    createPbisCards(data: $cards) {
      id
    }
  }
`;

// function to create array of cards based on value of id
function createCards(users, teacherId) {
  const userToAddCards = Object.keys(users);
  const cards = [];
  userToAddCards.forEach((user) => {
    if (users[user] > 0) {
      const numberOfCards = users[user];
      for (let i = 0; i < numberOfCards; i++) {
        cards.push(
          {
            student: { connect: { id: user } },
            teacher: { connect: { id: teacherId } },
            category: 'physical',
          },
        );
      }
    }
  });
  return cards;
}
export default function CountPhysicalCards({ taStudents, refetch }) {
  const me = useUser();
  const [showForm, setShowForm] = useState(false);
  const { recalculatePbisFromId } = useRecalculatePBIS();
  // creat an array of objects with keys taStudent.id and value of 0
  const taStudentCounts = {};
  taStudents.forEach((student) => {
    taStudentCounts[student.id] = 0;
  });
  // create an object with key of taStudent.id and value of 0

  //   const studentIds = taStudents.map((student) => student.id);
  const { inputs, handleChange, clearForm, resetForm } = useForm(
    taStudentCounts
  );
  const [countCardsMutation, { loading, error, data }] = useMutation(
    CREATE_CARD_MUTATION
  );

  return (
    <div>
      <GradientButton
        style={{ marginTop: '10px' }}
        onClick={() => setShowForm(!showForm)}
      >
        Log TA Cards
      </GradientButton>
      <div>
        <FormContainerStyles>
          <Form
            className={showForm ? 'visible' : 'hidden'}
            style={{ width: 'max-content' }}
            onSubmit={async (e) => {
              e.preventDefault();
              // Submit the inputfields to the backend:
              //   const res = await countCardsMutation();
              const cardsToCreate = await createCards(inputs, me.id);
              const res = await countCardsMutation({
                variables: { cards: cardsToCreate },
              });
              // get all the unique students from the cards
              const studentIds = cardsToCreate.map(
                (card) => card.student.connect.id
              );
              // get the unique student ids
              const uniqueStudentIds = [...new Set(studentIds)];
              // recalculate pbis for each student

              uniqueStudentIds.forEach((studentId) => {
                recalculatePbisFromId(studentId);
              });
              setTimeout(() => {
                refetch();
              }, 2000);
              resetForm();
              setShowForm(false);
            }}
          >
            <h1>Log TA Cards</h1>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              {taStudents.map((student) => (
                <div
                  key={student.id}
                  style={{
                    // display: 'inline',
                    // width: '5rem',
                    marginLeft: '10px',
                    display: 'grid',
                    gridTemplateColumns: '50% 5rem',
                  }}
                >
                  <label htmlFor={student.id} style={{ display: 'inline' }}>
                    {student.name}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    id={student.id}
                    name={student.id}
                    placeholder="Enter number of cards"
                    value={inputs[student.id]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <button type="submit">update Data</button>
            </fieldset>
          </Form>
        </FormContainerStyles>
      </div>
    </div>
  );
}
