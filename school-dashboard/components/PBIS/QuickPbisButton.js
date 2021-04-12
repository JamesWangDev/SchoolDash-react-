import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { UPDATE_PBIS } from '../../lib/pbisUtils';
import { SmallGradientButton } from '../styles/Button';
import { useUser } from '../User';

const CREATE_QUICK_PBIS = gql`
  mutation CREATE_QUICK_PBIS($teacher: ID!, $student: ID!) {
    createPbisCard(
      data: {
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        category: "quick"
      }
    ) {
      id
      student {
        name
      }
      teacher {
        name
      }
    }
  }
`;

export default function QuickPbisButton({ id, displayName = false }) {
  const me = useUser();
  const teacher = me.id;
  const [createCard, { loading, error, data }] = useMutation(
    CREATE_QUICK_PBIS,
    { variables: { teacher, student: id } }
  );
  console.log(id);
  const [updateCardCount, { loading: cardLoading }] = useMutation(UPDATE_PBIS, {
    variables: { userId: id },
  });
  return (
    <SmallGradientButton
      style={{ marginLeft: '1rem' }}
      onClick={async (e) => {
        e.preventDefault();
        console.log(teacher);
        console.log('creating card');
        const res = await createCard();
        console.log(res);
        await updateCardCount();
      }}
    >
      {loading || cardLoading ? 'Please Wait' : ''}
      {displayName ? `Quick Card for ${displayName}` : 'Quick Card'}
    </SmallGradientButton>
  );
}
