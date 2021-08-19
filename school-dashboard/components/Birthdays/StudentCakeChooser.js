import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';

import { useUser } from '../User';

const UPDATE_BIRTHDAY_MUTATION = gql`
  mutation UPDATE_BIRTHDAY_MUTATION($id: ID!, $cakeType: String!) {
    updateBirthday(id: $id, data: { cakeType: $cakeType }) {
      id
    }
  }
`;

export default function StudentCakeChooser({ birthday }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    cakeType: birthday.cakeType || '',
    date: birthday.date,
  });
  // const user = useUser();

  const [updateLink, { loading, error, data }] = useMutation(
    UPDATE_BIRTHDAY_MUTATION,
    {
      variables: {
        ...inputs,
        id: birthday.id,
      },
    }
  );
  const dob = new Date(birthday.date);
  return (
    <div>
      <GradientButton
        style={{ margin: '5px' }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'close' : 'Choose Your Birthday Cake!!'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          style={{ width: '500px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            console.log(inputs);
            const res = await updateLink();

            // refetch();
            setShowForm(false);
            // console.log(inputs);
          }}
        >
          <h2>Choose Your Birthday Cake!!</h2>
          <p>{dob.toLocaleDateString()}</p>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <FormGroupStyles> */}
            <label htmlFor="cakeType">
              What Type Of Cake Would You Like?
              <select
                style={{ marginLeft: '0' }}
                required
                type="text"
                id="cakeType"
                name="cakeType"
                // placeholder="Title of Assignment"
                value={inputs.cakeType || ''}
                onChange={handleChange}
              >
                <option disabled value="">
                  Please Choose an option
                </option>
                <option value="Chocolate Cake - Chocolate Frosting">
                  Chocolate Cake - Chocolate Frosting
                </option>
                <option value="Chocolate Cake - Vanilla Frosting">
                  Chocolate Cake - Vanilla Frosting
                </option>
                <option value="Chocolate Cake - Strawberry Frosting">
                  Chocolate Cake - Strawberry Frosting
                </option>
                <option value="Vanilla Cake - Chocolate Frosting">
                  Vanilla Cake - Chocolate Frosting
                </option>
                <option value="Vanilla Cake - Vanilla Frosting">
                  Vanilla Cake - Vanilla Frosting
                </option>
                <option value="Vanilla Cake - Strawberry Frosting">
                  Vanilla Cake - Strawberry Frosting
                </option>
              </select>
            </label>
            {/* </FormGroupStyles> */}

            <button type="submit">+ Submit</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
