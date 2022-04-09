import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useQueryClient } from 'react-query';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import { useUser } from '../User';
import SearchForUserName from '../SearchForUserName';
import { useGQLQuery } from '../../lib/useGqlQuery';
import useSendEmail from '../../lib/useSendEmail';
import useRevalidatePage from '../../lib/useRevalidatePage';

const GET_ADMIN_EMAILS = gql`
  query GET_ADMIN_EMAILS {
    users(where: { canManageDiscipline: true }) {
      id
      name
      email
    }
  }
`;

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
      student {
        id
        name
      }
    }
  }
`;

export default function CellPhoneAddButton() {
  const revalidatePage = useRevalidatePage('/discipline');
  const { data: adminEmails, isLoading } = useGQLQuery(
    `AdminEmails`,
    GET_ADMIN_EMAILS
  );
  const queryClient = useQueryClient();
  const adminEmailArray = adminEmails?.users?.map((u) => u.email);
  // console.log(adminEmailArray);
  const [showForm, setShowForm] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    description: '',
  });
  const me = useUser();

  const teacher = me?.id;
  const [studentCardIsFor, setStudentCardIsFor] = useState();
  // console.log(studentCardIsFor);
  const { sendEmail, emailLoading } = useSendEmail();
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
        {showForm ? 'close' : 'New Cell Phone Violation'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          style={{ width: '500px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            setEmailSending(true);
            const res = await createCellViolation();
            // console.log(res);
            if (res.data.createCellPhoneViolation.id) {
              for (const email of adminEmailArray) {
                const emailToSend = {
                  toAddress: email,
                  fromAddress: me.email,
                  subject: `New Cell Phone Violation for ${res.data.createCellPhoneViolation.student.name}`,
                  body: `
                <p>There is a new Cell Phone Violation for ${res.data.createCellPhoneViolation.student.name} at NCUJHS.TECH created by ${me.name}. </p>
                <p><a href="https://ncujhs.tech/discipline">Click Here to View</a></p>
                 `,
                };
                // console.log(emailToSend);
                const emailRes = await sendEmail({
                  variables: {
                    emailData: JSON.stringify(emailToSend),
                  },
                });
              }
            }

            setEmailSending(false);
            const revalidationResponse = revalidatePage();
            console.log(revalidationResponse);
            queryClient.refetchQueries('allDisciplines');
            resetForm();
            setShowForm(false);
          }}
        >
          <DisplayError error={error} />
          <h2>Cell Phone Violation</h2>
          <fieldset
            disabled={loading || emailSending}
            aria-busy={loading || emailSending}
          >
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
