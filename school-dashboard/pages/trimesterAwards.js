import gql from 'graphql-tag';
import { useState } from 'react';
import Toggle from 'react-toggle';
import Loading from '../components/Loading';
import TrimesterAwardsAllStudentsTable from '../components/TrimesterAwards/TrimesterAwardsAllStudentsTable';
import TrimesterAwardsTable from '../components/TrimesterAwards/TrimesterAwardsTable';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import 'react-toggle/style.css';

const GET_STUDENTS_AND_AWARDS_QUERY = gql`
  query GET_STUDENTS_AND_AWARDS {
  students: users(
    where: {
      AND: [{ isStudent: { equals: true } }, { NOT: { taTeacher: null } }]
    }
    orderBy: { name: asc }
  ) {
    id
    name
  }
  awards: trimesterAwards {
    id
    teacher {
      id
      name
    }
    student {
      id
      name
    }
    trimester
    howl
  }
}

`;

export default function TrimesterAwards() {
  const me = useUser();
  const [showAllStudents, setShowAllStudents] = useState(true);

  const { data, isLoading, refetch } = useGQLQuery(
    'trimesterAwards',
    GET_STUDENTS_AND_AWARDS_QUERY
  );
  // current trimester is 1 for November and December, 2 for February and March, 3 for May and June otherwise 0
  const currentMonth = new Date().getMonth() + 1;
  const currentTrimester =
    currentMonth === 11 || currentMonth === 12
      ? 1
      : currentMonth === 2 || currentMonth === 3
      ? 2
      : currentMonth === 5 || currentMonth === 6
      ? 3
      : 0;

  if (isLoading) return <Loading />;
  if (!me?.isStaff) return <p>Sorry</p>;
  const { students, awards } = data;
  // add awards to students
  students.forEach((student) => {
    student.awards = awards.filter((award) => award.student.id === student.id);
  });
  // get all awards for current trimester
  const currentAwards = awards.filter(
    (award) => award.trimester === currentTrimester.toString()
  );
  const myAwards = awards.filter((award) => award.teacher.id === me.id);

  return (
    <div>
      <h1>Trimester Awards</h1>
      <h2>
        {currentTrimester === 0
          ? 'It is not time to enter awards right now'
          : `Entering Awards for Trimester ${currentTrimester}`}
      </h2>
      <p className="hidePrint">
        <Toggle
          checked={!showAllStudents}
          onChange={() => setShowAllStudents(!showAllStudents)}
        />
        <span> Show only current awards</span>
      </p>

      {showAllStudents && (
        <>
          <div className="hidePrint">
            <h2>My Awards</h2>
            {myAwards.length === 0 ? (
              <p>You have not entered any awards yet</p>
            ) : (
              <TrimesterAwardsTable awards={myAwards} />
            )}
          </div>
          <h2>All Students</h2>
          <TrimesterAwardsAllStudentsTable
            students={students}
            trimester={currentTrimester}
            refetch={refetch}
          />
        </>
      )}
      {!showAllStudents && <TrimesterAwardsTable awards={currentAwards} />}
    </div>
  );
}
