import gql from 'graphql-tag';
import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';

const cardsPerPersonalLevel = 50;
const cardsPerTaLevel = 15;
const levelsPerSchoolWideLevel = 2;

const PBIS_COLLECTION_QUERY = gql`
  query PBIS_COLLECTION_QUERY {
    totalCards: _allPbisCardsMeta {
      count
    }
    uncountedCards: allPbisCards(where: { counted: false }) {
      id
      category
      student {
        id
        name
        taTeacher {
          id
          name
          taTeam {
            id
            teamName
          }
        }
      }
    }
    taTeachers: allUsers(where: { hasTA: true }) {
      id
      name
      _taStudentsMeta {
        count
      }
      previousTaWinner {
        id
        name
      }
      currentTaWinner {
        id
        name
      }
      taStudents {
        id
        name
        studentPbisCards(where: { counted: false }) {
          id
          category
          student {
            id
            name
          }
        }
      }
    }
    taTeams: allPbisTeams {
      id
      teamName
      currentLevel
      averageCardsPerStudent
      taTeacher {
        id
        name
      }
    }
    studentsWithCurrentCounts: allUsers(where: { isStudent: true }) {
      id
      name
      individualPbisLevel
      _studentPbisCardsMeta {
        count
      }
    }
    lastCollection: allPbisCollections {
      id
      name
      collectionDate
      personalLevelWinners
      randomDrawingWinners
      taTeamsLevels
    }
  }
`;

export default function usePbisCollection() {
  const [running, setRunning] = React.useState(false);
  const [getData, setGetData] = React.useState(false);
  const [randomDrawingWinners, setRandomDrawingWinners] = React.useState([]);
  const [personalLevelWinners, setPersonalLevelWinners] = React.useState([]);
  const [taTeamLevels, setTaTeamLevels] = React.useState([]);
  const [taTeamNewLevelWinners, setTaTeamNewLevelWinners] = React.useState([]);
  const [taCardPerStudent, setTaCardPerStudent] = React.useState([]);

  const { data, loading } = useGQLQuery(
    'pbisCollection',
    PBIS_COLLECTION_QUERY,
    {},
    { enabled: getData }
  );

  function getPersonalLevelWinners(students) {
    // check every student for a new level
    let personalLevelWinnersList = students.map((student) => {
      const oldLevel = student.individualPbisLevel;
      const newLevel = Math.floor(
        student._studentPbisCardsMeta.count / cardsPerPersonalLevel
      );
      if (oldLevel !== newLevel) {
        student.individualPbisLevel = newLevel;
        console.log('new personal level winner:', student.name, newLevel);
        return { student: student.id, name: student.name, level: newLevel };
      }
      return null;
    });
    // remove null values
    personalLevelWinnersList = personalLevelWinnersList.filter(Boolean);

    return personalLevelWinnersList;
  }

  function chooseRandomCardFromArrayOfCards(cards) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    return card;
  }

  function chooseARandomWinnerFromTaCardsThatDoesntMatchCurrentWinner(
    arrayOfCards,
    previousWinner
  ) {
    // console.log('arrayOfCards');
    // console.log(arrayOfCards);
    // choose a random card from the cards that doesn't match the current winner
    if (arrayOfCards.length === 0) {
      return {};
    }
    const cardsToChooseFrom = arrayOfCards.filter(
      (card) => card?.student.id !== previousWinner?.id
    );
    if (cardsToChooseFrom.length === 0) {
      return arrayOfCards[0];
    }

    const randomCard = chooseRandomCardFromArrayOfCards(cardsToChooseFrom);
    return randomCard;
  }

  function getTaWinnerAndCardsPerStudent(tas) {
    return tas.map((ta) => {
      const taId = ta.id;
      const oldCurrentWinner = ta.currentTaWinner;
      // array of cards from each students array of cards
      let taCards = [];
      ta.taStudents.map((student) => {
        taCards = [...taCards, ...student.studentPbisCards];
      });
      const winningCard = chooseARandomWinnerFromTaCardsThatDoesntMatchCurrentWinner(
        taCards,
        oldCurrentWinner
      );
      const taWinner = {
        ta: ta.id,
        taName: ta.name,
        studentName: winningCard?.student?.name || 'No Winner',
        studentId: winningCard?.student?.id || null,
      };
      const newCardsPerStudent = taCards.length;
      const numberOfStudentsInTa = ta.taStudents.length;
      const oldLevel = ta.currentLevel;
      const oldAverageCardsPerStudent = ta.averageCardsPerStudent;
      const averageCardsPerStudentToAdd =
        newCardsPerStudent / numberOfStudentsInTa;
      const newAverageCardsPerStudent =
        oldAverageCardsPerStudent + averageCardsPerStudentToAdd;
      const newLevel = Math.floor(newAverageCardsPerStudent / cardsPerTaLevel);
      const isNewLevel = oldLevel !== newLevel;

      return {
        taWinner,
        newCardsPerStudent,
        taId,
        numberOfStudentsInTa,
        isNewLevel,
        newLevel,
        newAverageCardsPerStudent,
      };
    });
  }

  function getTaTeamCardsPerStudent(taTeams, taInfo) {
    const taTeamInfo = taTeams.map((team) => {
      const teachers = team.taTeacher.map((teacher) => {
        const taId = teacher.id;
        return taId;
      });
      const tasInTeam = taInfo.filter((ta) =>
        // check if the current ta is in the team array
        ta.taId.includes(teachers)
      );
      // get the number of students in the team from the number of students in each ta
      const numberOfStudentsInTeam = tasInTeam.reduce(
        (prev, curr) => prev + curr.numberOfStudentsInTa,
        0
      );
      // get the nunmber of cards in the team from the number of cards in each ta
      const cardsInTeam = tasInTeam.reduce(
        (prev, curr) => prev + curr.newCardsPerStudent,
        0
      );
      const oldLevel = team.currentLevel;
      const oldAverageCardsPerStudent = team.averageCardsPerStudent;
      const averageCardsPerStudentToAdd = cardsInTeam / numberOfStudentsInTeam;
      const newAverageCardsPerStudent =
        oldAverageCardsPerStudent + averageCardsPerStudentToAdd;
      const newLevel = Math.floor(newAverageCardsPerStudent / cardsPerTaLevel);
      const isNewLevel = oldLevel !== newLevel;

      const teamInfo = {
        id: team.id,
        teamName: team.teamName,
        cardsInTeam,
        numberOfStudentsInTeam,
        isNewLevel,
        currentLevel: newLevel,
        averageCardsPerStudent: newAverageCardsPerStudent,
      };
      return teamInfo;
    });
    return taTeamInfo;
  }

  function getTaTeamsAtNewLevel(teamInfo) {
    const newLevelTeams = teamInfo.filter((team) => team.isNewLevel);
    return newLevelTeams;
  }

  async function runCardCollection() {
    setRunning(true);
    const studentWinners = getPersonalLevelWinners(
      data.studentsWithCurrentCounts
    );
    console.log('student winners', studentWinners);
    const taWinnersAndCards = getTaWinnerAndCardsPerStudent(data.taTeachers);
    setRandomDrawingWinners(taWinnersAndCards);
    setPersonalLevelWinners(studentWinners);
    const teamInfo = getTaTeamCardsPerStudent(data.taTeams, taWinnersAndCards);
    setTaTeamLevels(teamInfo);
    const taTeamsAtNewLevel = getTaTeamsAtNewLevel(teamInfo);
    setTaTeamNewLevelWinners(taTeamsAtNewLevel);

    setRunning(false);
  }
  const results = {
    randomDrawingWinners,
    personalLevelWinners,
    taTeamLevels,
    taTeamNewLevelWinners,
  };
  return { running, runCardCollection, data, setGetData, getData, results };
}
