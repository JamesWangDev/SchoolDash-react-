import { gql, useQuery } from '@apollo/client';
import { useGQLQuery } from '../lib/useGqlQuery';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        canManageCalendar
        canSeeOtherUsers
        canManageUsers
        canManageRoles
        canManageLinks
        canManageDiscipline
        canSeeAllDiscipline
        canSeeAllTeacherEvents
        canSeeStudentEvents
        canSeeOwnCallback
        canSeeAllCallback
        hasTA
        hasClasses
        isStudent
        isParent
        isStaff
        isTeacher
        isSuperAdmin
        PbisCardCount
        YearPbisCount
        studentPbisCards {
          id
          cardMessage
          category
          teacher {
            id
            name
          }
          dateGiven
        }
        taTeam {
          id
          teamName
        }
        taTeacher {
          id
          taTeam {
            id
            teamName
          }
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
