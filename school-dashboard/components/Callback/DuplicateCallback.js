import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';

import SearchForUserName from '../SearchForUserName';
import useRecalculateCallback from './recalculateCallback';
import { useUser } from '../User';
import useCreateMessage from '../Messages/useCreateMessage';

const DUPLICATE_CALLBACK_MUTATION = gql`
  mutation DUPLICATE_CALLBACK_MUTATION(
    $title: String!
    $dateAssigned: String
    $description: String
    $link: String
    $teacher: ID!
    $student: ID!
    $messageFromTeacher: String
  ) {
    createCallback(
      data: {
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        title: $title
        dateAssigned: $dateAssigned
        description: $description
        link: $link
        messageFromTeacher: $messageFromTeacher
      }
    ) {
      id
    }
  }
`;

export default function DuplicateCallback({ callback, setDuplicating }) {
  const router = useRouter();
  const date = new Date(callback.dateAssigned);
  // set date to the day before
  date.setDate(date.getDate() - 1);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    dateAssigned: date.toISOString().split('T')[0],
    title: callback.title,
    description: callback.description,
    link: callback.link,
  });
  const user = useUser();
  const [studentCallbackIsFor, setStudentCallbackIsFor] = useState(null);

  const [updateCallback, { loading, error, data }] = useMutation(
    DUPLICATE_CALLBACK_MUTATION,
    {
      variables: {
        ...inputs,
        dateAssigned: inputs.dateAssigned.concat('T24:00:00.000Z'),
        student: studentCallbackIsFor?.userId,
        teacher: user?.id,
      },
    }
  );
  // TODO: send message when callback assigned
  const createMessage = useCreateMessage();

  const { setCallbackID } = useRecalculateCallback();
  //   console.log(inputs);
  return (
    <div>
      {/* <FormContainerStyles> */}
      <Form
        className="visible"
        // hidden={!showForm}
        onSubmit={async (e) => {
          e.preventDefault();
          // Submit the input fields to the backend:
          console.log(inputs);
          const res = await updateCallback();
          console.log(res);
          createMessage({
            subject: 'New Callback Assignment',
            message: `you received a new callback item from ${user.name}`,
            receiver: studentCallbackIsFor?.userId,
            link: `/callback/${res?.data?.createCallback.id}`,
          });

          setCallbackID(res.data.createCallback.id);
          router.push({
            pathname: `/callback/${res.data.createCallback.id}`,
          });
          setDuplicating(false);
          // console.log(inputs);
        }}
      >
        <h2>Edit Callback Assignment</h2>
        <DisplayError error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <FormGroupStyles>
            <label htmlFor="studentName">Student Name</label>
            <SearchForUserName
              name="studentName"
              // value={inputs.studentName}
              updateUser={setStudentCallbackIsFor}
              userType="isStudent"
            />

            <label htmlFor="title">
              Assignment
              <input
                required
                type="text"
                id="title"
                name="title"
                placeholder="Title of Assignment"
                value={inputs.title || ''}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="dateAssigned">
              Due Date
              <input
                required
                type="date"
                id="dateAssigned"
                name="dateAssigned"
                value={inputs.dateAssigned}
                onChange={handleChange}
              />
            </label>
          </FormGroupStyles>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Assignment Description"
              required
              value={inputs.description}
              onChange={handleChange}
              rows="5"
            />
          </label>
          <label htmlFor="link">
            Link
            <input
              id="link"
              name="link"
              placeholder="Link to website"
              value={inputs.link}
              onChange={handleChange}
            />
          </label>
          <button type="submit">+ Publish</button>
        </fieldset>
      </Form>
      {/* </FormContainerStyles> */}
    </div>
  );
}
