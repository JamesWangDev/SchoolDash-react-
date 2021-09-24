import React from 'react';
import { SortingHatStyles } from '../pages/getSorted';

export default function SortedHouse({ house }) {
  return (
    <>
      <link
        href="http://fonts.cdnfonts.com/css/harrypotter7"
        rel="stylesheet"
      />
      <SortingHatStyles>
        <h1>You are in</h1>
        <h2>{house}</h2>
      </SortingHatStyles>
    </>
  );
}
