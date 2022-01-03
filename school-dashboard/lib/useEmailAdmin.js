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
  const [adminEmail, setEmailAdmin] = useState();
  const [sendEmail, { loading: emailLoading }] = useMutation(
    SEND_EMAIL_MUTATION
  );
  const { data, isLoading } = useGQLQuery(`AdminEmails`, GET_ADMIN_EMAILS);
  const adminEmailArray = data?.allUsers?.map((u) => u.email);
  useEffect(() => {
    console.log(adminEmail);
    if (adminEmail?.toAddress) {
      // console.log('emailing');
      // console.log(adminEmail);
      const emailToSend = JSON.stringify(adminEmail);
      // console.log(emailToSend);
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
  }, [adminEmail]);
  return { setEmailAdmin, emailLoading };
}
