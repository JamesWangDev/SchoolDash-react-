import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useGQLQuery } from "../lib/useGqlQuery";
import { SPECIAL_GROUP_QUERY } from "../pages/specialGroup";
import SearchForUserName from "./SearchForUserName";
import { useUser } from "./User";
import gql from "graphql-tag";
import Loading from "./Loading";
import styled from "styled-components";

const SpecialGroupStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  button {
    color: var(--textColor);
    border-radius: 5px;
    margin-inline: 3px;
    background: var(--tableAccentColor);
    /* opacity: 0.8; */
  }
  .remove {
    border: none;
    background: transparent;
  }
  .studentList {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const ADD_STUDENT_TO_GROUP_MUTATION = gql`
  mutation ADD_STUDENT_TO_GROUP_MUTATION($id: ID, $studentID: ID) {
    updateUser(
      where: { id: $id }
      data: { specialGroupStudents: { connect: { id: $studentID } } }
    ) {
      id
    }
  }
`;
const REMOVE_STUDENT_FROM_GROUP_MUTATION = gql`
  mutation REMOVE_STUDENT_FROM_GROUP_MUTATION($id: ID, $studentID: ID) {
    updateUser(
      where: { id: $id }
      data: { specialGroupStudents: { disconnect: { id: $studentID } } }
    ) {
      id
    }
  }
`;

export default function ModifySpecialGroup() {
  const me = useUser();
  const { data, isLoading, error, refetch } = useGQLQuery(
    `specialGroup-${me?.id}-${me?.name}-query`,
    SPECIAL_GROUP_QUERY,
    {
      id: me?.id,
    },
    {
      enabled: !!me,
      staleTime: 0,
    }
  );

  const [searchValue, setSearchValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [addStudent] = useMutation(ADD_STUDENT_TO_GROUP_MUTATION, {
    variables: {
      id: me?.id,
      studentID: searchValue?.userId,
    },
  });
  const [removeStudent] = useMutation(REMOVE_STUDENT_FROM_GROUP_MUTATION);

  const studentList = data.teacher.specialGroupStudents;
  return (
    <SpecialGroupStyles>
      <h4>Student Group</h4>
      {thinking ? <Loading /> : null}
      <SearchForUserName
        name="studentName"
        userType="isStudent"
        // value={inputs.studentName}
        updateUser={setSearchValue}
      />
      <button
        type="button"
        onClick={async () => {
          setThinking(true);
          await addStudent();
          await refetch();
          setSearchValue("");
          setThinking(false);
        }}
        disabled={searchValue === ""}
      >
        add {searchValue.userName}
      </button>
      <div className="studentList">
        {studentList.map((student) => (
          <div key={student.id}>
            <span>{student.name}</span>
            <button
              type="button"
              className="remove"
              onClick={async () => {
                setThinking(true);
                await removeStudent({
                  variables: {
                    id: me?.id,
                    studentID: student?.id,
                  },
                });
                await refetch();
                setSearchValue("");
                setThinking(false);
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </SpecialGroupStyles>
  );
}
