import { gql, useQuery } from '@apollo/client';

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
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  // console.log(data);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
