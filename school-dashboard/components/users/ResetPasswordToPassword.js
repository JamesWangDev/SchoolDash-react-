import gql from 'graphql-tag';
import React from 'react';
import GradientButton from '../styles/Button';

const RESET_PASSWORD_TO_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_TO_PASSWORD_MUTATION($id: id!) {
    updateCallback(id: $id, data: { password: "password" }) {
      id
    }
  }
`;

export default function ResetPasswordToPassword({ userID }) {
  return (
    <GradientButton>
      <span>Reset Password to Password</span>
    </GradientButton>
  );
}
