import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { object } from 'prop-types';
import { useState } from 'react';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import { useUser } from '../User';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($cards: [PbisCardsCreateInput]) {
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
    // console.log(users);
    if (users[user] > 0) {
      const numberOfCards = users[user];
      for (let i = 0; i < numberOfCards; i++) {
        cards.push({
          data: {
            student: { connect: { id: user } },
            teacher: { connect: { id: teacherId } },
            category: 'physical',
          },
        });
      }
    }
  });
  //   console.log(cards);
  return cards;
}
export default function CountPhysicalCards({ taStudents }) {
  const me = useUser();
  const [showForm, setShowForm] = useState(false);

  // creat an array of objects with keys taStudent.id and value of 0
  const taStudentCounts = {};
  taStudents.forEach((student) => {
    taStudentCounts[student.id] = 0;
  });
  // create an object with key of taStudent.id and value of 0

  //   const studentIds = taStudents.map((student) => student.id);
  const { inputs, handleChange, clearForm } = useForm(taStudentCounts);
  const [countCardsMutation, { loading, error, data }] = useMutation(
    CREATE_CARD_MUTATION
  );
  //   console.log(inputs);

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
              //   console.log(inputs);
              const cardsToCreate = await createCards(inputs, me.id);
              console.log(JSON.stringify(cardsToCreate));
              //   const res = await countCardsMutation({
              //     variables: { data: inputs },
              //   });
              //   console.log(res);
              clearForm();
              //   setShowForm(false);
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
