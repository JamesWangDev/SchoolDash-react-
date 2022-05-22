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
import { useGQLQuery } from '../../lib/useGqlQuery';
import StudentList from './StudentListForMultiSelectCallback';

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
      student {
        id
        name
      }
    }
  }
`;

const USERS_CLASS_STUDENTS_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        block1Students (orderBy: {name: asc}){
          id
          name
        }
        block2Students (orderBy: {name: asc}) {
          id
          name
        }
        block3Students (orderBy: {name: asc}){
          id
          name
        }
        block4Students (orderBy: {name: asc}) {
          id
          name
        }
        block5Students (orderBy: {name: asc}){
          id
          name
        }
      }
    }
  }
`;

export default function NewCallbackMultiStudent({ refetch }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    dateAssigned: todaysDateForForm(),
    title: '',
    description: '',
    link: '',
  });
  const user = useUser();
  const [studentsCallbackIsFor, setStudentsCallbackIsFor] = useState([]);

  const [createCallback, { loading, error }] = useMutation(
    CREATE_CALLBACK_MUTATION,
    {
      variables: {
        ...inputs,
        dateAssigned: new Date(inputs.dateAssigned.concat('T24:00:00.000Z')),
        teacher: user?.id,
        student: studentsCallbackIsFor?.userId,
      },
    }
  );

  const { data, isLoading } = useGQLQuery(
    'myClassStudents',
    USERS_CLASS_STUDENTS_QUERY,
    {},
    {
      // enabled: !!showForm,
    }
  );
  // console.log(data);
  const createMessage = useCreateMessage();

  const { setCallbackID } = useRecalculateCallback();
  //   console.log(inputs);
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm
          ? 'Close the form'
          : 'New Callback Assignment For Multiple Students'}
      </GradientButton>

      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(studentsCallbackIsFor);
            if (studentsCallbackIsFor?.length > 0) {
              for (const student of studentsCallbackIsFor) {
                const res = await createCallback({
                  variables: {
                    ...inputs,
                    dateAssigned: new Date(inputs.dateAssigned.concat('T24:00:00.000Z')),
                    teacher: user?.id,
                    student,
                  },
                });
                setCallbackID(res.data.createCallback.id);
                // console.log(res);
                createMessage({
                  subject: 'New Callback Assignment',
                  message: `you received a new callback item from ${res.data.createCallback.student.name}`,
                  receiver: student,
                  link: `/callback/${res?.data?.createCallback.id}`,
                });
                toast.success(
                  `Created Callback for ${res.data.createCallback.student.name}`
                );
              }
              refetch();
              resetForm();
              setStudentsCallbackIsFor([]);
              setShowForm(false);
            } else {
              toast.error('Please select at least one student');
            }
          }}
        >
          <h2>Add a New Callback Assignment</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <FormGroupStyles>
              <StudentList
                studentList={data?.authenticatedItem}
                selectedStudents={studentsCallbackIsFor}
                setSelecetedStudents={setStudentsCallbackIsFor}
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
      </FormContainerStyles>
    </div>
  );
}
