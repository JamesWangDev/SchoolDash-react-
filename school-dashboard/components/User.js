import { gql, useQuery } from '@apollo/client';
import { useGQLQuery } from '../lib/useGqlQuery';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        role {
          name
          canManageCalendar
          canManageLinks
          hasTA
          hasClasses
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useGQLQuery('me', CURRENT_USER_QUERY);
  // console.log(data);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
