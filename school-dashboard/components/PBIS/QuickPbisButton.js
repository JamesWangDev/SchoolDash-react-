import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { SmallGradientButton } from '../styles/Button';
import { useUser } from '../User';

const CREATE_QUICK_PBIS = gql`
  mutation CREATE_QUICK_PBIS($teacher: ID, $student: ID) {
    createPbisCard(
      data: { teacher: $teacher, student: $student, category: "quick" }
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
  return (
    <SmallGradientButton style={{ marginLeft: '1rem' }}>
      {/* TODO Link to actual pbis card */}
      <Link href={`/givePbisCard/${id}`}>
        {displayName ? `Quick Card for ${displayName}` : 'Quick PBIS Card'}
      </Link>
    </SmallGradientButton>
  );
}
