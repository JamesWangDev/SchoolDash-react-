import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';

import { useUser } from '../User';
import SearchForUserName from '../SearchForUserName';

const ADD_CELLPHONE_MUTATION = gql`
  mutation ADD_CELLPHONE_MUTATION(
    $description: String!
    $student: ID!
    $teacher: ID!
  ) {
    createCellPhoneViolation(
      data: {
        description: $description
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
      }
    ) {
      id
    }
  }
`;

export default function CellPhoneAddButton() {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    description: '',
  });
  const me = useUser();

  const teacher = me?.id;
  const [studentCardIsFor, setStudentCardIsFor] = useState();
  // console.log(studentCardIsFor);

  const [createCellViolation, { loading, error, data }] = useMutation(
    ADD_CELLPHONE_MUTATION,
    {
      variables: {
        teacher,
        student: studentCardIsFor?.userId,
        description: inputs.description,
      },
    }
  );
  if (error) {
    console.log(error);
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <GradientButton
        style={{ margin: '5px' }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'close' : 'Cell Phone Violation'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          style={{ width: '500px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            console.log(inputs);
            const res = await createCellViolation();

            // refetch();
            setShowForm(false);
            // console.log(inputs);
          }}
        >
          <DisplayError error={error} />
          <h2>Cell Phone Violation</h2>
          <fieldset disabled={loading} aria-busy={loading}>
            <SearchForUserName
              name="studentName"
              // value={inputs.studentName}
              updateUser={setStudentCardIsFor}
              userType="isStudent"
            />
            {/* <FormGroupStyles> */}
            <label htmlFor="description">
              Description
              <input
                style={{ marginLeft: '0' }}
                required
                type="text"
                id="description"
                name="description"
                placeholder="Title of Assignment"
                value={inputs.description || ''}
                onChange={handleChange}
              />
            </label>
            {/* </FormGroupStyles> */}

            <button type="submit">+ Submit</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
