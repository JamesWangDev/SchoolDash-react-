const cardsPerPersonalLevel = 50;
const cardsPerTaLevel = 15;
const levelsPerSchoolWideLevel = 2;

// get the number of students in teh team
// get the average number of cards per student in the team
export function getTaTeamData(data) {
  console.log('getting TA Team Data');
  const taTeamData = data.map((team) => {
    // for each team, get the team data
    const newCardsPerTeacher = team.taTeacher.map((ta) =>
      ta.taStudents
        .map((student) => student.uncountedCards.count)
        .reduce((a, b) => Number(a) + Number(b), 0)
    );
    const newCardsPerTeam = newCardsPerTeacher.reduce(
      (a, b) => Number(a) + Number(b),
      0
    );
    // console.log('cards per team', newCardsPerTeam);
    const numberOfStudentInTeam = team.taTeacher.reduce(
      (a, b) => a + b.taStudents.length,
      0
    );
    // console.log('number of student in team', numberOfStudentInTeam);

    const newAverageCardsPerStudent = newCardsPerTeam / numberOfStudentInTeam;
    const totalAverageCardsPerStudent =
      (team.averageCardsPerStudent || 0) + newAverageCardsPerStudent || 0;
    const newTeamLevel = Math.floor(
      totalAverageCardsPerStudent / cardsPerTaLevel
    );
    const taTeam = {
      id: team.id,
      name: team.teamName,
      averageCardsPerStudent: totalAverageCardsPerStudent,
      numberOfStudents: numberOfStudentInTeam,
      currentTaLevel: newTeamLevel || 0,
      isNewLevel: newTeamLevel > (team.currentTaLevel || 0),
    };

    return taTeam;
  });
  return taTeamData;
  //   console.log('taTeamData', taTeamData);
}

// get the personal level of each student and
// return students at a new level with their level
export function getPersonalLevel(data) {
  console.log('getting personal levels');
  const allStudents = [];
  const students = data.map((team) => {
    // for each team get all the ta teachers
    const allTeachers = team.taTeacher.map((ta) => {
      // for each ta teacher get all the students
      const allTAStudents = ta.taStudents.map((student) => {
        allStudents.push(student);
        return student;
      });
      return allTAStudents;
    });
    return allTeachers;
  });
  const newStudentData = allStudents.map((student) => {
    const newCardsPerStudent = student.uncountedCards.count;
    const newPersonalLevel = Math.floor(
      newCardsPerStudent / cardsPerPersonalLevel
    );
    const newStudent = {
      name: student.name,
      id: student.id,
      individualPbisLevel: newPersonalLevel || 0,
      isNewLevel: newPersonalLevel > student.individualPbisLevel,
    };
    return newStudent;
  });
  //   console.log('newStudentData', newStudentData);
  const studentsAtNewLevel = newStudentData.filter(
    (student) => student.isNewLevel
  );
  const studentsAtNewLevelWithoutIsNewLevel = studentsAtNewLevel.map(
    (student) => {
      const newStudent = {
        name: student.name,
        id: student.id,
        individualPbisLevel: student.individualPbisLevel,
      };
      return newStudent;
    }
  );

  //   console.log('studentsAtNewLevel', studentsAtNewLevelWithoutIsNewLevel);
  return studentsAtNewLevelWithoutIsNewLevel;
}

// create a card to choose from for each card in students count
function createCardsForStudent(student) {
  const numberOfCardsToCreate = student.uncountedCards.count;
  const cards = [];
  for (let i = 0; i < numberOfCardsToCreate; i++) {
    cards.push({
      id: student.id,
      name: student.name,
    });
  }
  return cards;
}

// get the random winner for each TA
export function getRandomWinners(data) {
  console.log('getting random winners');
  const listOfAllTaTeachers = [];
  const taToGetWinners = data.map((team) => {
    // for each team get all the ta teachers
    const allTeachers = team.taTeacher.map((teacher) => {
      listOfAllTaTeachers.push(teacher);
      return teacher;
    });
    return allTeachers;
  });
  console.log('taToGetWinners', listOfAllTaTeachers);
  const randomWinners = listOfAllTaTeachers.map((teacher) => {
    const cardsToChooseFrom = [];
    teacher.taStudents.forEach((student) => {
      cardsToChooseFrom.push(...createCardsForStudent(student));
    });

    const cardsToChooseFromWithoutLastWinner = cardsToChooseFrom.filter(
      (card) => card.id !== teacher.currentTaWinner?.id
    );
    // console.log(
    //   'cardsToChooseFromWithoutLastWinner',
    //   cardsToChooseFromWithoutLastWinner
    // );
    const randomWinner = {};
    if (cardsToChooseFrom.length === 0) {
      randomWinner.name = 'No Winner';
    } else if (cardsToChooseFromWithoutLastWinner.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * cardsToChooseFromWithoutLastWinner.length
      );
      randomWinner.id = cardsToChooseFromWithoutLastWinner[randomIndex].id;
      randomWinner.name = cardsToChooseFromWithoutLastWinner[randomIndex].name;
    } else {
      randomWinner.id = teacher.currentTaWinner.id;
      randomWinner.name = teacher.currentTaWinner.name;
    }

    const newTeacher = {
      name: teacher.name,
      id: teacher.id,
      randomWinner,
    };
    return newTeacher;
  });
  console.log('randomWinners', randomWinners);
  return 'winners';
}
