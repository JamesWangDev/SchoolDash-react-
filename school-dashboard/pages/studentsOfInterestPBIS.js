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
      studentPbisCards(orderBy: { dateGiven: desc }, take: 1) {
        id
        dateGiven
      }
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
      margin: 0rem;
      padding: 5px;
    }
    .gridItem {
      border: 2px solid grey;
      border-radius: 5px;
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
  const studentsWithTaTeacher = data?.students.filter(
    (student) => student.taTeacher
  );

  if (isLoading) return <Loading />;
  if (!isAllowed(me, "isStaff")) return "invalid user";
  const averageCards = Math.round(getAverageYearlyPbis(studentsWithTaTeacher));

  const topStudents = studentsWithTaTeacher
    .sort((a, b) => {
      return b.YearPbisCount - a.YearPbisCount;
    })
    .slice(0, numberOfStudentsToDisplay);

  const bottomStudents = studentsWithTaTeacher
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
            const date = new Date(
              student?.studentPbisCards?.[0]?.dateGiven
            ).toLocaleDateString();
            const daysSinceLastCard = Math.round(
                (new Date() -
                  new Date(student?.studentPbisCards?.[0]?.dateGiven)) /
                  (1000 * 60 * 60 * 24)
              ),
              daysSinceLastCardString =
                daysSinceLastCard > 0
                  ? `${daysSinceLastCard} days ago`
                  : "today";
            return (
              <div className="gridItem" key={student?.id}>
                <p title={student?.taTeacher?.name}>
                  {student?.name} - {student?.YearPbisCount}
                </p>
                <p>TA: {student?.taTeacher?.name}</p>
                <p>
                  Last Card: {date} - {daysSinceLastCardString}
                </p>
              </div>
            );
          })}
        </div>
        <div className="top">
          <h3>Top {numberOfStudentsToDisplay} Students</h3>
          {topStudents.map((student) => {
            const date = new Date(
              student?.studentPbisCards?.[0]?.dateGiven
            ).toLocaleDateString();
            const daysSinceLastCard = Math.round(
                (new Date() -
                  new Date(student?.studentPbisCards?.[0]?.dateGiven)) /
                  (1000 * 60 * 60 * 24)
              ),
              daysSinceLastCardString =
                daysSinceLastCard > 0
                  ? `${daysSinceLastCard} days ago`
                  : "today";
            return (
              <div className="gridItem" key={student?.id}>
                <p title={student?.taTeacher?.name}>
                  {student?.name} - {student?.YearPbisCount}
                </p>
                <p>TA: {student?.taTeacher?.name}</p>
                <p>
                  Last Card: {date} - {daysSinceLastCardString}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </PbisDataStyles>
  );
}
