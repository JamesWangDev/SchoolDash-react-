import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useGQLQuery } from './useGqlQuery';

const GET_ADMIN_EMAILS = gql`
  query GET_ADMIN_EMAILS {
    allUsers(where: { canManageDiscipline: true }) {
      id
      name
      email
    }
  }
`;

const SEND_EMAIL_MUTATION = gql`
  mutation SEND_EMAIL_MUTATION($emailData: String!) {
    sendEmail(emailData: $emailData) {
      id
    }
  }
`;

export default async function useEmailAdmin() {
  const [email, setEmailAdmin] = useState();
  const [sendEmail, { loading: emailLoading }] = useMutation(
    SEND_EMAIL_MUTATION
  );
  const { data, isLoading } = useGQLQuery(`AdminEmails`, GET_ADMIN_EMAILS);
  const adminEmailArray = data?.allUsers?.map((u) => u.email);
  useEffect(() => {
    console.log(email);
    if (email?.toAddress) {
      console.log('emailing');
      console.log(email);
      const emailToSend = JSON.stringify(email);
      console.log(emailToSend);
      // const emailToSendd = {
      //   toAddress: email,
      //   fromAddress: me.email,
      //   subject: 'NCUJHS.TECH Parent Account Signup',
      //   body: `
      //   <p>You have been invited to register for a parent account for ${student.name} at NCUJHS.TECH. </p>
      //   <p><a href="ncujhs.tech/parentRegistration/${student.id}">Click here to register</a></p>
      //   `,
      // };
      // sendEmail({});
    }
  }, [email]);
  return { setEmailAdmin, emailLoading };
}
