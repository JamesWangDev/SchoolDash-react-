// import { gql, useQuery } from '@apollo/client';
import { useGQLQuery } from '../lib/useGqlQuery';
import { request, gql , GraphQLClient} from "graphql-request";
import { endpoint, prodEndpoint } from '../config';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      __typename
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
        sortingHat
        children {
          id
          name
        }
        studentPbisCards(
          orderBy: {dateGiven:desc}
          take: 20
          where: { category: {not: {equals:"physical"}} }
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
          date
        }
      }
    }
  }
`;

export  function useUser() {
  const { data } = useGQLQuery('me', CURRENT_USER_QUERY);
  // console.log("user",data);
  // const newData = await getUser();
// console.log("newData",newData);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };


async function getUser() {
  //check if on client
  if (typeof window !== "undefined") {
  // const token = localStorage.getItem('token');
  // console.log("token",token);
  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      // authorization: `Bearer ${token}`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  const fetchAllLinks = async () =>
    graphQLClient.request(CURRENT_USER_QUERY);

  const res = await fetchAllLinks();

 
  console.log("userfetch",res);
  return res.authenticatedItem;
  }
  return null;
}