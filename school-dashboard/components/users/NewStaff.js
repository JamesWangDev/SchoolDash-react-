import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import GradientButton from '../styles/Button';
import useForm from '../../lib/useForm';
import Form, { FormContainerStyles } from '../styles/Form';
import DisplayError from '../ErrorMessage';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($studentScheduleData: String!) {
    updateStudentSchedules(studentScheduleData: $studentScheduleData) {
      name
    }
  }
`;

export default function NewUpdateUsers() {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm } = useForm();
  const [upateUsersFromJson, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      variables: { studentScheduleData: inputs.userData },
    }
  );
  const [resultOfUpdate, setResultOfUpdate] = useState(null);

  return (
    <div>
      <GradientButton
        style={{ marginTop: '10px' }}
        onClick={() => setShowForm(!showForm)}
      >
        User Update
      </GradientButton>
      <div>
        <FormContainerStyles>
          <Form
            className={showForm ? 'visible' : 'hidden'}
            onSubmit={async (e) => {
              e.preventDefault();
              // Submit the inputfields to the backend:
              const res = await upateUsersFromJson();
              setResultOfUpdate(
                JSON.parse(res.data.updateStudentSchedules.name)
              );
              // clearForm();
              setShowForm(false);
            }}
          >
            <h1>Update all students schedules</h1>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="userData">
                Import Student Schedules as JSON
                <textarea
                  required
                  rows="25"
                  type="text"
                  id="userData"
                  name="userData"
                  placeholder="JSON goes here"
                  value={inputs.data}
                  onChange={handleChange}
                />
              </label>

              <button type="submit">update Data</button>
            </fieldset>
          </Form>
        </FormContainerStyles>
        {resultOfUpdate && (
          <div>
            {resultOfUpdate.map((user) => {
              console.log(user);
              return (
                <p key={user.id}>
                  {user.email} - {user.existed ? 'Existing User' : 'New User'}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
