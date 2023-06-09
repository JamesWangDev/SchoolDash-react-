import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import toast from 'react-hot-toast';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import SearchForUserName from '../SearchForUserName';
import { todaysDateForForm } from '../calendars/formatTodayForForm';
import useRecalculateCallback from './recalculateCallback';
import { useUser } from '../User';
import useCreateMessage from '../Messages/useCreateMessage';

const CREATE_CALLBACK_MUTATION = gql`
  mutation CREATE_CALLBACK_MUTATION(
    $title: String!
    $dateAssigned: DateTime
    $teacher: ID!
    $student: ID!
    $description: String
    $link: String
  ) {
    createCallback(
      data: {
        title: $title
        dateAssigned: $dateAssigned
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        description: $description
        link: $link
      }
    ) {
      id
    }
  }
`;

export default function NewCallback({ refetch }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    dateAssigned: todaysDateForForm(),
  });
  const user = useUser();
  const [studentCallbackIsFor, setStudentCallbackIsFor] = useState(null);

  const [createCallback, { loading, error, data }] = useMutation(
    CREATE_CALLBACK_MUTATION,
    {
      variables: {
        ...inputs,
        dateAssigned: new Date(inputs.dateAssigned.concat('T24:00:00.000Z')),
        teacher: user?.id,
        student: studentCallbackIsFor?.userId,
      },
    }
  );
  // TODO: send message when callback assigned
  const createMessage = useCreateMessage();

  const { setCallbackID } = useRecalculateCallback();
  //   console.log(inputs);
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm ? 'Close the form' : 'New Callback Assignment'}
      </GradientButton>

      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await createCallback();
            // console.log(res);
            // console.log(res.data.createCallback.id);
            setCallbackID(res.data.createCallback.id);
            // console.log(res);
            createMessage({
              subject: 'New Callback Assignment',
              message: `you received a new callback item from ${user.name}`,
              receiver: studentCallbackIsFor?.userId,
              link: `/callback/${res?.data?.createCallback.id}`,
            });
            refetch();
            // recalculateCallback();
            resetForm();
            toast.success(
              `Created Callback for ${studentCallbackIsFor?.userName}`
            );
            router.push({
              pathname: `/callback/${res.data.createCallback.id}`,
            });
            // setShowForm(false);
            // console.log(inputs);
          }}
        >
          <h2>Add a New Callback Assignment</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <FormGroupStyles>
              <div>
                <label htmlFor="studentName">Student Name</label>
                <SearchForUserName
                  name="studentName"
                  // value={inputs.studentName}
                  updateUser={setStudentCallbackIsFor}
                  userType="isStudent"
                />
              </div>

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
      </FormContainerStyles>
    </div>
  );
}
