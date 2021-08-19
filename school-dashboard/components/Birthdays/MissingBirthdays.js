import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';
import { useUser } from '../User';

export default function MissingBirthdays() {
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    'AllBirthdays',
    ALL_BIRTHDAYS_QUERY,
    {},
    { initialData: [], enabled: !!me }
  );
  return <div />;
}
