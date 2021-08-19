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
        canManagePbis
        hasTA
        hasClasses
        isStudent
        isParent
        isStaff
        isTeacher
        isSuperAdmin
        PbisCardCount
        YearPbisCount
        children {
          id
          name
        }
        studentPbisCards(
          sortBy: dateGiven_ASC
          first: 20
          where: { category_not: "physical" }
        ) {
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
        birthday {
          id
          cakeType
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
