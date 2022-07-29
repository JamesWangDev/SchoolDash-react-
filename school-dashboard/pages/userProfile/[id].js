import gql from "graphql-tag";
import styled from "styled-components";
import { useGQLQuery } from "../../lib/useGqlQuery";
import Loading from "../../components/Loading";
import { useUser } from "../../components/User";
import isAllowed from "../../lib/isAllowed";
import ViewTeacherPage from "../../components/users/ViewTeacherPage";
import ViewStudentPage from "../../components/users/ViewStudentPage";
import ViewParentPage from "../../components/users/ViewParentPage";
import ResetPasswordToPassword from "../../components/users/ResetPasswordToPassword";
import SendParentEmailSignupButton from "../../components/users/SendParentEmailSignup";
import EditStudent from "../../components/users/EditStudent";
import { capitalizeFirstLetter } from "../../lib/nameUtils";

const ButtonStyles = styled.div`
  display: flex;
  justify-content: space-around;
`;
const GET_SINGLE_USER = gql`
  query GET_SINGLE_USER($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      email
      taStudents {
        id
        name
      }
      children {
        id
        name
      }
      block1Teacher {
        name
        id
      }
      block2Teacher {
        name
        id
      }
      block3Teacher {
        name
        id
      }
      block4Teacher {
        name
        id
      }
      block5Teacher {
        name
        id
      }
      block6Teacher {
        name
        id
      }
      block7Teacher {
        name
        id
      }
      block8Teacher {
        name
        id
      }
      taTeacher {
        name
        id
      }

      isStaff
      isParent
      isStudent
    }
  }
`;

export default function UserProfile({ query }) {
  // console.log('query', query);
  const me = useUser();
  const { data, isLoading, error } = useGQLQuery(
    `SingleUser-${query.id}`,
    GET_SINGLE_USER,
    { id: query.id }
  );
  if (isLoading || !me) return <Loading />;
  if (error) return <p>{error.message}</p>;
  if (!isAllowed(me, "isStaff")) return null;
  const user = data?.user;
  const { isStudent } = user;
  return (
    <div>
      <h1>{capitalizeFirstLetter(user.name)}</h1>
      <ButtonStyles>
        {isAllowed(me, "isStaff") && me.id !== user.id && (
          <>
            {isStudent && <EditStudent student={user} />}
            <SendParentEmailSignupButton student={user} />
            <ResetPasswordToPassword userID={query.id} />
          </>
        )}
      </ButtonStyles>
      {isAllowed(user, "isStaff") && <ViewTeacherPage teacher={user} />}
      {isAllowed(user, "isStudent") && <ViewStudentPage student={user} />}
      {isAllowed(user, "isParent") && <ViewParentPage parent={user} />}
    </div>
  );
}
