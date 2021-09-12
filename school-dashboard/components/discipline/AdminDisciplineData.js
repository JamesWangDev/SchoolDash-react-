import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import useForm from '../../lib/useForm';
import { SmallGradientButton } from '../styles/Button';

const UPDATE_DISCIPLINE_ADMIN = gql`
  mutation UPDATE_DISCIPLINE_ADMIN($id: ID!, $adminComments: String) {
    updateDiscipline(id: $id, data: { adminComments: $adminComments }) {
      id
    }
  }
`;

export default function AdminDisciplineData({ discipline, refetch }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    adminComments: discipline.adminComments || discipline.teacherComments,
  });
  const [edit, setEdit] = useState(false);
  const [updateDiscipline, { loading, error, data }] = useMutation(
    UPDATE_DISCIPLINE_ADMIN,
    {
      variables: {
        id: discipline.id,
        adminComments: inputs.adminComments,
      },
    }
  );

  return (
    <div>
      <h2>
        <span className="hidePrint">Admin Edited</span> Description:
      </h2>
      <SmallGradientButton
        className="hidePrint"
        disabled={loading}
        onClick={async () => {
          if (!edit) {
            setEdit(true);
          } else {
            await updateDiscipline();
            await refetch();
            // alert('Changes Saved');
            setEdit(false);
          }
        }}
      >
        {edit ? 'Save Changes' : 'Edit'}
      </SmallGradientButton>
      <p>{!edit && (discipline.adminComments || discipline.teacherComments)}</p>
      {edit && (
        <form>
          <textarea
            disabled={loading}
            aria-disabled={loading}
            id="adminComments"
            name="adminComments"
            value={inputs.adminComments}
            rows="12"
            onChange={handleChange}
            style={{ width: '100%', fontSize: '1.6rem', padding: '2rem' }}
          />
        </form>
      )}
    </div>
  );
}
