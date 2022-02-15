import gql from 'graphql-tag';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAsyncGQLQuery } from './useGqlQuery';
import useSendEmail from './useSendEmail';

const STUDENT_INFO_QUERY = gql`
  query STUDENT_INFO_QUERY($id: ID!) {
    User(where: { id: $id }) {
      id
      name
      email
      isStudent
      parent {
        id
        name
        email
      }
    }
  }
`;

const UPDATE_STUDENT_WITH_EXISTING_PARENT_MUTATION = gql`
  mutation UPDATE_STUDENT_WITH_EXISTING_PARENT_MUTATION(
    $id: ID!
    $parent: UserRelateToManyInput!
  ) {
    updateUser(id: $id, data: { parent: $parent }) {
      id
    }
  }
`;

const PARENT_INFO_QUERY = gql`
  query PARENT_INFO_QUERY($email: String!) {
    allUsers(where: { email: $email }) {
      id
      name
      email
      isStudent
      isParent
      children {
        id
        name
        email
      }
    }
  }
`;

const SIGNUP_NEW_PARENT_MUTATION = gql`
  mutation SIGNUP_NEW_PARENT_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $children: UserRelateToManyInput!
    $isParent: Boolean!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        password: $password
        isParent: $isParent
        children: $children
      }
    ) {
      id
      name
      email
    }
  }
`;

const CREATE_PARENT_ACCOUNT_MUTATION = gql`
  mutation CREATE_PARENT_ACCOUNT_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $children: UserRelateToManyInput!
    $isParent: Boolean!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        password: $password
        isParent: $isParent
        children: $children
      }
    ) {
      id
      name
      email
    }
  }
`;

export function useNewParentAccount() {
  const [creatingParentAccount, setCreatingParentAccount] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const { sendEmail, emailLoading } = useSendEmail();
  const getStudentData = useAsyncGQLQuery(STUDENT_INFO_QUERY);
  const getParentData = useAsyncGQLQuery(PARENT_INFO_QUERY);
  const [createNewUser, { loading, data: newUser, error }] = useMutation(
    SIGNUP_NEW_PARENT_MUTATION,
    {}
  );
  const [
    updateStudentWithExistingParent,
    { loading: updatingStudent, error: updateStudentError },
  ] = useMutation(UPDATE_STUDENT_WITH_EXISTING_PARENT_MUTATION, {});

  async function createParentAccount(props) {
    const { parentEmail, parentName, student, teacher } = props;
    setCreatingParentAccount(true);
    console.log('props', props);
    // get student's current parent info
    setStudentId(student.id);
    const studentWithParents = await getStudentData({ id: student.id });
    const { parent } = studentWithParents.User;

    const allParentEmails = parent.map((p) => p.email);
    console.log('allParentEmails', allParentEmails);
    // check if the parent email already exists with that student
    const parentEmailAlreadyExists = allParentEmails.includes(parentEmail);
    // If the parent email exists return because we don't want to create a new parent account
    if (parentEmailAlreadyExists)
      return { result: 'This Parent already exists!! No Account Created' };

    // check if a parent account with the email address exists
    const existingParent = await getParentData({ email: parentEmail });

    const isThisAnExistingParent = existingParent?.allUsers.length > 0;
    const existingParentID = existingParent?.allUsers[0]?.id;

    // if there is an existing parent account with the email address
    // link this student to that parent account
    if (isThisAnExistingParent) {
      const res = await updateStudentWithExistingParent({
        variables: {
          id: student.id,
          parent: { connect: { id: existingParentID } },
        },
      });
      console.log('res', res);
      return {
        result: 'parent already existed.  Connected to this student account',
      };
    }

    // if not, create a new parent account
    const password = Math.random().toString(36).substring(2, 10);
    if (!isThisAnExistingParent) {
      const newParent = await createNewUser({
        variables: {
          email: parentEmail,
          name: parentName,
          password,
          children: { connect: { id: student.id } },
          isParent: true,
        },
      });
      console.log('newParent', newParent);
      // email to parent with password
      const emailToSend = {
        toAddress: parentEmail,
        fromAddress: teacher.email,
        subject: `NCUJHS.Tech account - ${student.name}`,
        body: `
    <p>NCUJHS.Tech is a schoolwide dashboard. A parent account has been created for you.  To login use this email address.  Your password is: ${password}</p>
    <p><a href="https://ncujhs.tech">Click Here to View The NCUJHS School Dashboard</a></p>
    
     `,
      };
      // console.log(emailToSend);
      const emailRes = await sendEmail({
        variables: {
          emailData: JSON.stringify(emailToSend),
        },
      });
      setCreatingParentAccount(false);
      return {
        result: `New Parent Account Created for ${parentName}. Email with login sent to ${parentEmail}`,
      };
    }

    setCreatingParentAccount(false);
    return { result: 'There was an error.  Please try again.' };
  }

  return [createParentAccount, creatingParentAccount];
}
