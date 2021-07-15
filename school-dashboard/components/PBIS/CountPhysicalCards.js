import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { object } from 'prop-types';
import { useState } from 'react';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($studentScheduleData: String!) {
    addStaff(staffData: $studentScheduleData) {
      name
    }
  }
`;

export default function CountPhysicalCards({ taStudents }) {
  const [showForm, setShowForm] = useState(false);

  // creat an array of objects with keys taStudent.id and value of 0
  const taStudentCounts = [];
  taStudents.forEach((student) => {
    taStudentCounts.push({
      key: student.id,
      value: 0,
    });
  });
  // create an object with key of taStudent.id and value of 0

  //   const studentIds = taStudents.map((student) => student.id);
  console.log(taStudentCounts);
  const { inputs, handleChange, clearForm } = useForm();
  const [countCardsMutation, { loading, error, data }] = useMutation(
    CREATE_CARD_MUTATION,
    {
      variables: { studentScheduleData: inputs.userData },
    }
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
            onSubmit={async (e) => {
              e.preventDefault();
              // Submit the inputfields to the backend:
              //   const res = await countCardsMutation();
              console.log(inputs);

              // clearForm();
              setShowForm(false);
            }}
          >
            <h1>Update all students schedules</h1>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              {taStudents.map((student) => (
                <div key={student.id}>
                  <label htmlFor={student.id}>
                    {student.name}
                    <span>
                      <input
                        type="number"
                        id={student.id}
                        name={student.id}
                        placeholder="Enter number of cards"
                        value={inputs[student.id]}
                        onChange={handleChange}
                      />
                    </span>
                  </label>
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
