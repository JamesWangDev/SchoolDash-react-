import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import { useUser } from '../User';
import SearchForUserName from '../SearchForUserName';
import { useGQLQuery } from '../../lib/useGqlQuery';
import useSendEmail from '../../lib/useSendEmail';

const ADD_AWARD_MUTATION = gql`
  mutation ADD_AWARD_MUTATION(
    $howl: String!
    $student: ID!
    $teacher: ID!
    $trimester: String!
  ) {
    createTrimesterAward(
      data: {
        howl: $howl
        trimester: $trimester
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
      }
    ) {
      id
    }
  }
`;

export default function TrimesterAwardButton({ student, trimester, refetch }) {
  const [showForm, setShowForm] = useState(false);

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    howl: '',
    trimester,
  });
  const me = useUser();

  const teacher = me?.id;

  // console.log(studentCardIsFor);

  const [createTrimesterAward, { loading, error, data }] = useMutation(
    ADD_AWARD_MUTATION,
    {
      variables: {
        teacher,
        student: student.id,
        howl: inputs.howl,
        trimester: trimester.toString(),
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
        {showForm ? 'close' : 'Trimester Award'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          style={{ width: '500px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await createTrimesterAward();
            // console.log(res);
            resetForm();
            await refetch();
            setShowForm(false);
            // console.log(inputs);
          }}
        >
          <DisplayError error={error} />
          <h2>Trimester Award for {student.name}</h2>
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <FormGroupStyles> */}
            <label htmlFor="howl">
              H.O.W.L.
              <select
                style={{ marginLeft: '0' }}
                required
                id="howl"
                name="howl"
                placeholder="Title of Assignment"
                value={inputs.howl || ''}
                onChange={handleChange}
              >
                <option value="">Select H.O.W.L.</option>
                <option value="Respect">Respect</option>
                <option value="Responsibility">Responsibility</option>
                <option value="Perseverance">Perseverance</option>
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
