import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { useQueryClient } from 'react-query';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import SearchForUserName from '../SearchForUserName';
import { todaysDateForForm } from '../calendars/formatTodayForForm';

import { useUser } from '../User';
import useCreateMessage from '../Messages/useCreateMessage';
import { useGQLQuery } from '../../lib/useGqlQuery';
import useSendEmail from '../../lib/useSendEmail';

const GET_GUIDANCE_EMAILS = gql`
  query GET_GUIDANCE_EMAILS {
    allUsers(where: { isGuidance: true }) {
      id
      name
      email
    }
  }
`;

const CREATE_STUDENT_FOCUS = gql`
  mutation CREATE_STUDENT_FOCUS(
    $comments: String!
    $teacher: ID!
    $student: ID!
    $category: String!
  ) {
    createStudentFocus(
      data: {
        comments: $comments
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        category: $category
      }
    ) {
      id
      student {
        id
        name
        taTeacher {
          id
          name
        }
      }
    }
  }
`;

export default function NewStudentFocusButton({ refetch }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    category: 'General Comments',
  });
  const user = useUser();
  const [studentWhoIsFor, setStudentWhoIsFor] = useState(null);
  const { data: guidance, isLoading } = useGQLQuery(
    `GuidanceEmails`,
    GET_GUIDANCE_EMAILS
  );
  const guidanceAccounts = (guidance && guidance.allUsers) || [];
  const guidanceEmailList = guidanceAccounts.map((g) => g.email);
  console.log('guidanceEmailList', guidanceEmailList);
  const { setEmail, emailLoading } = useSendEmail();
  const [createStudentFocus, { loading, error, data }] = useMutation(
    CREATE_STUDENT_FOCUS,
    {
      variables: {
        comments: inputs.comments,
        category: inputs.category,
        teacher: user?.id,
        student: studentWhoIsFor?.userId,
      },
    }
  );
  // TODO: send message when callback assigned
  const createMessage = useCreateMessage();

  //   console.log(inputs);
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm ? 'Close the form' : 'New Student Focus'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await createStudentFocus();
            console.log(res);

            // Todo: send message when callback assigned
            createMessage({
              subject: 'New Student Focus',
              message: `${res?.data?.createStudentFocus?.student.name} has a new Student Focus from ${user.name}`,
              receiver: res?.data?.createStudentFocus?.student.taTeacher?.id,
              link: ``,
            });

            if (res.data.createStudentFocus.id) {
              guidanceEmailList.map((email) => {
                const emailToSend = {
                  toAddress: email,
                  fromAddress: user.email,
                  subject: `New Student Focus for ${res.data.createStudentFocus.student.name}`,
                  body: `
                <p>There is a new Student Focus Entry for ${res.data.createStudentFocus.student.name} at NCUJHS.TECH created by ${user.name}. </p>
                 `,
                };
                console.log(emailToSend);
                setEmail(emailToSend);
                return null;
              });
            }
            queryClient.refetchQueries('allStudentFocus');
            // recalculateCallback();
            clearForm();
            setStudentWhoIsFor(null);
            setShowForm(false);
          }}
        >
          <h2>Add a New Student Focus</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <FormGroupStyles>
              <div>
                <label htmlFor="studentName">Student Name</label>
                <SearchForUserName
                  name="studentName"
                  // value={inputs.studentName}
                  updateUser={setStudentWhoIsFor}
                  userType="isStudent"
                />
              </div>

              <label htmlFor="category">
                Category
                <select
                  required
                  type="select"
                  id="category"
                  name="category"
                  value={inputs.category}
                  onChange={handleChange}
                >
                  <option value="Parent Contact">Parent Contact</option>
                  <option value="General Comments">General Comments</option>
                  <option value="Notes">Notes</option>
                </select>
              </label>
            </FormGroupStyles>
            <label htmlFor="comments">
              Comments
              <textarea
                id="comments"
                name="comments"
                placeholder="Comments"
                required
                value={inputs.comments}
                onChange={handleChange}
                rows="5"
              />
            </label>

            <button type="submit">+ Publish</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
