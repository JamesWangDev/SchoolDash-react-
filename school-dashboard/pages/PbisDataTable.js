import gql from "graphql-tag";
import { useState } from "react";
import { useUser } from "../components/User";
import isAllowed from "../lib/isAllowed";
import { useGQLQuery } from "../lib/useGqlQuery";
import Loading from "../components/Loading";
import styled from "styled-components";
import GradientButton from "../components/styles/Button";

const PbisDataStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .isAboveAverage {
    color: rgba(0, 255, 0, 0.6);
  }
  .isBelowAverage {
    color: rgba(255, 0, 0, 0.6);
  }
`;

const PBIS_DATA_QUERY = gql`
  query PBISDataQuery {
    students: users(where: { isStudent: { equals: true } }) {
      id
      name
      YearPbisCount
      block1Teacher {
        id
        name
      }
      block2Teacher {
        id
        name
      }
      block3Teacher {
        id
        name
      }
      block4Teacher {
        id
        name
      }
      block5Teacher {
        id
        name
      }
      block6Teacher {
        id
        name
      }
      block7Teacher {
        id
        name
      }
      block8Teacher {
        id
        name
      }
    }
    teachers: users(where: { hasClasses: { equals: true } }) {
      id
      name
    }
  }
`;

const roundToOneDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

const getTeacherListFromBlocksInStudents = (students, teachers) => {
  const teacherList = [];
  students.forEach((student) => {
    if (student.block1Teacher) {
      // check if teacher is already in list
      if (!teacherList.includes(student.block1Teacher.id)) {
        teacherList.push(student.block1Teacher.id);
      }
    }
    if (student.block2Teacher) {
      if (!teacherList.includes(student.block2Teacher.id)) {
        teacherList.push(student.block2Teacher.id);
      }
    }
    if (student.block3Teacher) {
      if (!teacherList.includes(student.block3Teacher.id)) {
        teacherList.push(student.block3Teacher.id);
      }
    }
    if (student.block4Teacher) {
      if (!teacherList.includes(student.block4Teacher.id)) {
        teacherList.push(student.block4Teacher.id);
      }
    }
    if (student.block5Teacher) {
      if (!teacherList.includes(student.block5Teacher.id)) {
        teacherList.push(student.block5Teacher.id);
      }
    }
    if (student.block6Teacher) {
      if (!teacherList.includes(student.block6Teacher.id)) {
        teacherList.push(student.block6Teacher.id);
      }
    }
    if (student.block7Teacher) {
      if (!teacherList.includes(student.block7Teacher.id)) {
        teacherList.push(student.block7Teacher.id);
      }
    }
    if (student.block8Teacher) {
      if (!teacherList.includes(student.block8Teacher.id)) {
        teacherList.push(student.block8Teacher.id);
      }
    }
  });
  const teacherListWithNames = teacherList.map((teacherId) => {
    const teacher = teachers.find((teacher) => teacher.id === teacherId);
    return {
      id: teacher.id,
      name: teacher?.name || "error",
    };
  });
  return teacherListWithNames;
};

const getStudentsWhoHaveTeacher = (teacherId, students) => {
  const studentsWithTeacher = [];
  students.forEach((student) => {
    if (student.block1Teacher && student.block1Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block2Teacher && student.block2Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block3Teacher && student.block3Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block4Teacher && student.block4Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block5Teacher && student.block5Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block6Teacher && student.block6Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block7Teacher && student.block7Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
    if (student.block8Teacher && student.block8Teacher.id === teacherId) {
      studentsWithTeacher.push(student);
    }
  });
  return studentsWithTeacher;
};

export const getAverageYearlyPbis = (students) => {
  const averageYearlyPbis = students.reduce((acc, student) => {
    return acc + student.YearPbisCount;
  }, 0);
  return averageYearlyPbis / students.length;
};

const sortTeachersByAverageYearlyPbis = (teachers) => {
  return teachers.sort((a, b) => {
    // console.log(a.averageYearlyPbis, b.averageYearlyPbis);
    return a.averageYearlyPbis - b.averageYearlyPbis;
  });
};

// Actual component that renders the data
export default function PbisDataTable() {
  const me = useUser();
  const { data, isLoading } = useGQLQuery(
    "pbisDataQuery",
    PBIS_DATA_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 3, // 3 minutes
    }
  );
  const students = data?.students || [];
  const teachers = data?.teachers || [];
  const teachersWithClasses = getTeacherListFromBlocksInStudents(
    students,
    teachers
  );
  const teachersWithTheirStudents = teachersWithClasses.map((teacher) => {
    const teachersStudents = getStudentsWhoHaveTeacher(teacher.id, students);
    const teachersStudentsAveragePbis = getAverageYearlyPbis(teachersStudents);
    return {
      ...teacher,
      students: teachersStudents,
      averageYearlyPbis: teachersStudentsAveragePbis,
    };
  });
  const overallAverageYearlyPbis = getAverageYearlyPbis(students);

  const [sortMethod, setSortMethod] = useState("alphabetical");
  const [teachersToDisplay, setTeachersToDisplay] = useState([]);
  const teachersSortedByAverageYearlyPbis = sortTeachersByAverageYearlyPbis(
    teachersWithTheirStudents
  );
  const teachersSortedAlphabetically = teachersWithTheirStudents.sort(
    (a, b) => {
      return a.name.localeCompare(b.name);
    }
  );

  console.log(teachersToDisplay);
  const changeSortMethod = (sortMethod) => {
    if (sortMethod === "average") {
      setTeachersToDisplay(teachersSortedAlphabetically);
      setSortMethod("alphabetical");
    }
    if (sortMethod === "alphabetical") {
      setTeachersToDisplay(
        sortTeachersByAverageYearlyPbis(teachersWithTheirStudents)
      );
      setSortMethod("average");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!me && isAllowed(me, "canManagePbis")) {
    return null;
  }

  return (
    <PbisDataStyles>
      <h1>PBIS Data</h1>
      <h2>
        Overall Average Yearly PBIS:{" "}
        {roundToOneDecimal(overallAverageYearlyPbis)}
      </h2>
      <GradientButton onClick={() => changeSortMethod(sortMethod)}>
        Sort by {sortMethod === "average" ? "Alphabetical" : "Average"}
      </GradientButton>
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Average Yearly PBIS</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {teachersToDisplay.map((teacher) => (
            <tr
              key={teacher.id}
              className={
                teacher.averageYearlyPbis > overallAverageYearlyPbis
                  ? "isAboveAverage"
                  : "isBelowAverage"
              }
            >
              <td>{teacher.name}</td>
              <td>{roundToOneDecimal(teacher.averageYearlyPbis)}</td>
              <td>{teacher.students.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PbisDataStyles>
  );
}
