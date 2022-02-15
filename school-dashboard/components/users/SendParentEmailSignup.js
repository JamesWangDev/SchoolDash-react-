import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { toast } from 'react-hot-toast';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import { useUser } from '../User';
import useSendEmail from '../../lib/useSendEmail';
import { useNewParentAccount } from '../../lib/useNewParentAccount';

export default function SendParentEmailSignupButton({ student }) {
  const me = useUser();
  const [showForm, setShowForm] = React.useState(false);
  const { inputs, handleChange, clearForm } = useForm({
    parentEmail: '',
    parentName: '',
  });
  const { setEmail, emailLoading } = useSendEmail();
  const [createParentAccount, creatingParentAccount] = useNewParentAccount();

  if (!student) return null;
  return (
    <div>
      <GradientButton
        style={{ marginTop: '10px', marginBottom: '10px' }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm
          ? 'Hide  Parent Signup  '
          : 'Send A Parent Account Signup Email'}
      </GradientButton>
      <div style={{ position: 'relative', marginLeft: '-300px' }}>
        <FormContainerStyles>
          <Form
            className={showForm ? 'visible' : 'hidden'}
            onSubmit={async (e) => {
              e.preventDefault();
              // check if email is a valid email address
              const email = inputs.parentEmail;
              const name = inputs.parentName;
              if (!email) {
                setEmail(null);
                return;
              }

              // create parent account
              const data = await createParentAccount({
                parentEmail: email.toLowerCase(),
                parentName: name,
                student,
                teacher: me,
              });

              console.log(data);
              if (data) {
                toast(data.result, {
                  duration: 4000,
                  icon: '👨‍👧‍👦',
                });
              }

              clearForm();
              setShowForm(false);
            }}
          >
            <fieldset
              disabled={emailLoading || creatingParentAccount}
              aria-busy={emailLoading || creatingParentAccount}
            >
              <label htmlFor="parentEmail">
                Parent / Guardian Email
                <input
                  required
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  placeholder="Parent Email"
                  value={inputs.parentEmail}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="parentName">
                Parent / Guardian Name
                <input
                  required
                  type="name"
                  id="parentName"
                  name="parentName"
                  placeholder="Parent Name"
                  value={inputs.parentName}
                  onChange={handleChange}
                />
              </label>

              <button type="submit">Send Email</button>
            </fieldset>
          </Form>
        </FormContainerStyles>
      </div>
    </div>
  );
}
