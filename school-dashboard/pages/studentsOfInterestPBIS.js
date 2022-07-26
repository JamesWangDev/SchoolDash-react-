import React, { useState } from "react";
import { useUser } from "../components/User";
import isAllowed from "../lib/isAllowed";
import { useGQLQuery } from "../lib/useGqlQuery";
import Loading from "../components/Loading";
import styled from "styled-components";
import GradientButton from "../components/styles/Button";
import gql from "graphql-tag";
import { getAverageYearlyPbis } from "../pages/PbisDataTable";

const PBIS_STUDENTS_OF_INTEREST_QUERY = gql`
  query PBIS_STUDENTS_OF_INTEREST_QUERY {
    students: users(where: { isStudent: { equals: true } }) {
      id
      name
      YearPbisCount
      taTeacher {
        id
        name
      }
    }
  }
`;

const PbisDataStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 10px;
    width: 100%;
    height: 100%;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    p {
      margin: 0.5rem;
    }
  }
`;

export default function StudentsOfInterestPBIS() {
  const me = useUser();
  const [numberOfStudentsToDisplay, setNumberOfStudentsToDisplay] =
    useState(10);
  const { data, isLoading } = useGQLQuery(
    "pbis students of interest",
    PBIS_STUDENTS_OF_INTEREST_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 3, // 3 minutes
    }
  );

  if (isLoading) return <Loading />;
  if (!isAllowed(me, "isStaff")) return "invalid user";
  const averageCards = Math.round(getAverageYearlyPbis(data.students));

  const topStudents = data.students
    .sort((a, b) => {
      return b.YearPbisCount - a.YearPbisCount;
    })
    .slice(0, numberOfStudentsToDisplay);

  const bottomStudents = data.students
    .sort((a, b) => {
      return a.YearPbisCount - b.YearPbisCount;
    })
    .slice(0, numberOfStudentsToDisplay);

  return (
    <PbisDataStyles>
      <h2>PBIS Card Count Students of Interest</h2>
      <h3>Current Average Number Of Cards: {averageCards}/Student</h3>
      <div>
        <label>
          Number of students to display:
          <input
            type="range"
            min="1"
            max="25"
            value={numberOfStudentsToDisplay}
            onChange={(e) => setNumberOfStudentsToDisplay(e.target.value)}
          />
          {numberOfStudentsToDisplay}
        </label>
      </div>
      <div className="grid">
        <div className="bottom">
          <h3>Bottom {numberOfStudentsToDisplay} Students</h3>
          {bottomStudents.map((student) => {
            return (
              <p key={student?.id} title={student?.taTeacher?.name}>
                {student?.name} - {student?.YearPbisCount}
              </p>
            );
          })}
        </div>
        <div className="top">
          <h3>Top {numberOfStudentsToDisplay} Students</h3>
          {topStudents.map((student) => {
            return (
              <p key={student?.id} title={student?.taTeacher?.name}>
                {student?.name} - {student?.YearPbisCount}
              </p>
            );
          })}
        </div>
      </div>
    </PbisDataStyles>
  );
}
