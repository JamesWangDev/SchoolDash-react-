import { GrCheckboxSelected, GrCheckbox } from 'react-icons/gr';

import { FaBirthdayCake } from 'react-icons/fa';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import GradientButton, { SmallGradientButton } from '../styles/Button';

const UPDATE_BIRTHDAY_FOR_DELIVERED_CAKE_MUTATION = gql`
  mutation UPDATE_BIRTHDAY_FOR_DELIVERED_CAKE_MUTATION(
    $id: ID!
    $isDelivered: Boolean!
  ) {
    updateBirthday(where: {id: $id}, data: { hasDelivered: $isDelivered }) {
      id
    }
  }
`;

export default function DeliveredCake({ cake }) {
  const isDelivered = cake.hasDelivered;
  const hasChosen = cake.cakeType;
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const [updateBirthday, { error, data }] = useMutation(
    UPDATE_BIRTHDAY_FOR_DELIVERED_CAKE_MUTATION,
    {}
  );

  return (
    <GradientButton
      disabled={loading || !hasChosen}
      onClick={async () => {
        setLoading(true);

        const updatedBirthday = await updateBirthday({
          variables: { id: cake.id, isDelivered: !isDelivered },
        });
        await queryClient.refetchQueries('AllBirthdays');
        setLoading(false);
      }}
    >
      <FaBirthdayCake />
      {isDelivered ? (
        <GrCheckboxSelected
          style={{
            background: 'green',
            marginInline: '10px',
            size: '50px',
          }}
        />
      ) : (
        <GrCheckbox
          style={{ background: 'red', marginInline: '10px', size: '50px' }}
        />
      )}
      <FaBirthdayCake />
    </GradientButton>
  );
}
