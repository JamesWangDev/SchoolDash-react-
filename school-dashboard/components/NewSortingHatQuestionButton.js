import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { useQueryClient } from 'react-query';
import useForm from '../lib/useForm';

import useSendEmail from '../lib/useSendEmail';
import { useUser } from './User';
import GradientButton from './styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from './styles/Form';
import DisplayError from './ErrorMessage';

const CREATE_SORTING_QUESTION = gql`
  mutation CREATE_SORTING_QUESTION(
    $question: String!
    $gryffindorChoice: String!
    $hufflepuffChoice: String!
    $ravenclawChoice: String!
    $slytherinChoice: String!
    $createdBy: ID!
  ) {
    createSortingHatQuestion(
      data: {
        question: $question
        gryffindorChoice: $gryffindorChoice
        hufflepuffChoice: $hufflepuffChoice
        ravenclawChoice: $ravenclawChoice
        slytherinChoice: $slytherinChoice
        createdBy: { connect: { id: $createdBy } }
      }
    ) {
      id
    }
  }
`;

export default function NewSortingHatQuestion() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    question: '',
    gryffindorChoice: '',
    ravenclawChoice: '',
    hufflepuffChoice: '',
    slytherinChoice: '',
  });
  const me = useUser();

  const [createSortingHatQuestion, { loading, error }] = useMutation(
    CREATE_SORTING_QUESTION,
    {
      variables: {
        question: inputs.question,
        gryffindorChoice: inputs.gryffindorChoice,
        ravenclawChoice: inputs.ravenclawChoice,
        hufflepuffChoice: inputs.hufflepuffChoice,
        slytherinChoice: inputs.slytherinChoice,
        createdBy: me.id,
      },
    }
  );
  // TODO: send message when callback assigned

  //   console.log(inputs);
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm ? 'Close the form' : 'New Sorting Hat Question'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await createSortingHatQuestion();
            // console.log(res);

            // Todo: send message when callback assigned

            queryClient.refetchQueries('SortingHatQuestions');
            // recalculateCallback();
            clearForm();
            setShowForm(false);
          }}
        >
          <h2>Add a New Sorting Hat Question</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="question">
              Question
              <textarea
                id="question"
                name="question"
                placeholder="question"
                required
                value={inputs.question}
                onChange={handleChange}
                rows="5"
              />
            </label>
            <label htmlFor="gryffindorChoice">
              Gryffindor Choice
              <textarea
                id="gryffindorChoice"
                name="gryffindorChoice"
                placeholder="gryffindorChoice"
                required
                value={inputs.gryffindorChoice}
                onChange={handleChange}
                rows="2"
              />
            </label>
            <label htmlFor="ravenclawChoice">
              Ravenclaw Choice
              <textarea
                id="ravenclawChoice"
                name="ravenclawChoice"
                placeholder="ravenclawChoice"
                required
                value={inputs.ravenclawChoice}
                onChange={handleChange}
                rows="2"
              />
            </label>
            <label htmlFor="hufflepuffChoice">
              Hufflepuff Choice
              <textarea
                id="hufflepuffChoice"
                name="hufflepuffChoice"
                placeholder="hufflepuffChoice"
                required
                value={inputs.hufflepuffChoice}
                onChange={handleChange}
                rows="2"
              />
            </label>
            <label htmlFor="slytherinChoice">
              Slytherin Choice
              <textarea
                id="slytherinChoice"
                name="slytherinChoice"
                placeholder="slytherinChoice"
                required
                value={inputs.slytherinChoice}
                onChange={handleChange}
                rows="2"
              />
            </label>

            <button type="submit">+ Publish</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
