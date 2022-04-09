import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { capitalizeFirstLetter } from '../../lib/nameUtils';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../Loading';
import { useUser } from '../User';

const MISSING_BIRTHDAYS_QUERY = gql`
  query {
    users(where: { isStudent: {equals: true} }) {
      id
      name
      birthday {
        id
        hasChosen
      }
    }
  }
`;

const MissingBirthdayStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
`;

export default function MissingBirthdays() {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    'missingBirthdays',
    MISSING_BIRTHDAYS_QUERY,
    {},
    { enabled: !!me }
  );
  const needsToChooseCake = data?.allUsers?.filter(
    (user) => !user.birthday?.cakeType
  );
  const needsBirthdayDate = data?.allUsers?.filter((user) => !user.birthday);

  if (isLoading) return <Loading />;
  return (
    <MissingBirthdayStyles>
      <div>
        <h3>Needs to choose a cake type</h3>
        {needsToChooseCake?.map((user) => (
          <div key={user.id}>
            <p>{capitalizeFirstLetter(user.name)}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Missing DOB</h3>
        {needsBirthdayDate?.map((user) => (
          <div key={user.id}>
            <p>{capitalizeFirstLetter(user.name)}</p>
          </div>
        ))}
      </div>
    </MissingBirthdayStyles>
  );
}
