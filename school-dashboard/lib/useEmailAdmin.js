import gql from 'graphql-tag';
import { useState } from 'react';
import useSendEmail from './useSendEmail';

// const GET_ADMIN_EMAILS = gql`
// query GET_ADMIN_EMAILS{
//     allUsers

export default async function useEmailAdmin() {
  const [email, setEmailAdmin] = useState({});

  return { setEmailAdmin };
}
