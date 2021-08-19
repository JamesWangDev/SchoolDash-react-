import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import GradientButton from '../styles/Button';
import useForm from '../../lib/useForm';
import Form, { FormContainerStyles } from '../styles/Form';
import DisplayError from '../ErrorMessage';

const UPDATE_EVENTS_MUTATION = gql`
  mutation UPDATE_EVENTS_MUTATION($birthdayData: String!) {
    addBirthdays(birthdayData: $birthdayData) {
      date
    }
  }
`;

export default function NewEvents() {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm } = useForm();
  const [addBirthdaysFromJson, { loading, error, data }] = useMutation(
    UPDATE_EVENTS_MUTATION,
    {
      variables: { birthdayData: inputs.userData },
    }
  );
  const [resultOfUpdate, setResultOfUpdate] = useState(null);

  return (
    <div>
      <GradientButton
        style={{ marginTop: '10px' }}
        onClick={() => setShowForm(!showForm)}
      >
        Add Birthdays
      </GradientButton>
      <div>
        <FormContainerStyles>
          <Form
            className={showForm ? 'visible' : 'hidden'}
            onSubmit={async (e) => {
              e.preventDefault();
              // Submit the inputfields to the backend:
              const res = await addBirthdaysFromJson();
              // setResultOfUpdate(
              //   JSON.parse(res.data.updateStudentSchedules.name)
              // );
              // clearForm();
              setShowForm(false);
            }}
          >
            <h1>Add Birthdays for All Students</h1>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="userData">
                Import Birthdays as JSON
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
        {/* {resultOfUpdate && (
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
        )} */}
      </div>
    </div>
  );
}
