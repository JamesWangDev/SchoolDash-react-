import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import { useUser } from '../User';
import useSendEmail from '../../lib/useSendEmail';

export default function SendParentEmailSignupButton({ student }) {
  const me = useUser();
  const [showForm, setShowForm] = React.useState(false);
  const { inputs, handleChange, clearForm } = useForm({ parentEmail: '' });
  const { setEmail, emailLoading } = useSendEmail();
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
              if (!email) {
                setEmail(null);
                return;
              }

              // Submit the inputfields to the backend:

              const emailToSend = {
                toAddress: email,
                fromAddress: me.email,
                subject: 'NCUJHS.TECH Parent Account Signup',
                body: `asdf`,
              };
              const res = await setEmail(emailToSend);
              clearForm();
              setShowForm(false);
            }}
          >
            <fieldset disabled={emailLoading} aria-busy={emailLoading}>
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

              <button type="submit">Send Email</button>
            </fieldset>
          </Form>
        </FormContainerStyles>
      </div>
    </div>
  );
}
