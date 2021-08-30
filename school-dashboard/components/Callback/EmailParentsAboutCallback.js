import React from 'react';
import useSendEmail from '../../lib/useSendEmail';
import GradientButton from '../styles/Button';
import { useUser } from '../User';

function createEmail({ toAddress, fromAddress, studentName, callbackNumber }) {
  const email = {
    toAddress,
    fromAddress,
    subject: `NCUJHS.Tech Update about ${studentName}`,
    body: `
        <p>This is an update about ${studentName}. They have ${callbackNumber} overdue assignments.</p>
        <p><a href="https://ncujhs.tech">Click here to sign in and view them</a></p>
        `,
  };
  return email;
}
export default function EmailParentsAboutCallback({ student }) {
  const [loading, setLoading] = React.useState(false);
  //   console.log('student', student);
  const me = useUser();
  const { sendEmail, emailLoading } = useSendEmail();
  const studentName = student.name;
  const callbacks = student.callbackItems;
  const callbackCount = callbacks.length;
  const parentEmails = student.parent.map((parent) => parent.email);
  return (
    <GradientButton
      disabled={loading || emailLoading || true}
      onClick={() => {
        setLoading(true);
        // Map over all parents
        parentEmails.map(async (email) => {
          // Create email
          const emailToSend = createEmail({
            toAddress: email,
            fromAddress: me.email,
            studentName,
            callbackNumber: callbackCount,
          });
          // Send email
          console.log('sending email to', emailToSend);
          sendEmail({
            variables: {
              emailData: JSON.stringify(emailToSend),
            },
          });
          return emailToSend;
        });
        // add note to student focus about parent emails
        setLoading(false);
      }}
    >
      Email Parents about Callback
    </GradientButton>
  );
}
