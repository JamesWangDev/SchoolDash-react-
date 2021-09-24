import React from 'react';
import { useQueryClient } from 'react-query';
import { SortingHatStyles } from '../pages/getSorted';

export default function SortedHouse({ house, updateHouse, me }) {
  const queryClient = useQueryClient();
  const houseCapitalized = house.charAt(0).toUpperCase() + house.slice(1);
  return (
    <>
      <link
        href="http://fonts.cdnfonts.com/css/harrypotter7"
        rel="stylesheet"
      />
      <SortingHatStyles>
        <h1>You are in</h1>
        <h2>{house}</h2>
        <button
          type="button"
          onClick={async () => {
            await updateHouse({
              variables: {
                id: me.id,
                house: '',
              },
            });
            queryClient.refetchQueries('me');
          }}
        >
          Reset your choice
        </button>
      </SortingHatStyles>
    </>
  );
}
