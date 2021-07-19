import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';
import setPbisCollection from './useCreateCollectionMutation';

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

const CREATE_PBIS_COLLECTION_MUTATION = gql`
  mutation CREATE_PBIS_COLLECTION_MUTATION(
    $name: String!
    $randomDrawingWinners: String!
    $personalLevelWinners: String!
    $taTeamLevels: String!
    $taTeamNewLevelWinners: String!
    $currentPbisTeamGoal: String!
  ) {
    createPbisCollection(
      data: {
        name: $name
        randomDrawingWinners: $randomDrawingWinners
        personalLevelWinners: $personalLevelWinners
        taTeamsLevels: $taTeamLevels
        taTeamNewLevelWinners: $taTeamNewLevelWinners
        currentPbisTeamGoal: $currentPbisTeamGoal
      }
    ) {
      id
    }
  }
`;

const UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION = gql`
  mutation UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION(
    $id: ID!
    $currentTaWinner: ID!
    $previousTaWinner: ID!
  ) {
    updateUser(
      id: $id
      data: {
        currentTaWinner: $currentTaWinner
        previousTaWinner: $previousTaWinner
      }
    ) {
      id
    }
  }
`;

export default function usePbisCollection() {
  // const [running, setRunning] = React.useState(false);
  const [getData, setGetData] = React.useState(false);
  const [randomDrawingWinners, setRandomDrawingWinners] = React.useState([]);
  const [personalLevelWinners, setPersonalLevelWinners] = React.useState([]);
  const [taTeamLevels, setTaTeamLevels] = React.useState([]);
  const [taTeamNewLevelWinners, setTaTeamNewLevelWinners] = React.useState([]);
  const [taCardPerStudent, setTaCardPerStudent] = React.useState([]);
  const [currentPbisTeamGoal, setCurrentPbisTeamGoal] = React.useState(2);

  const [updateTaTeacher] = useMutation(
    UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION,
    {}
  );

  const [createNewPbisCollection] = useMutation(
    CREATE_PBIS_COLLECTION_MUTATION,
    {}
  );
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

  async function getTaWinnerAndCardsPerStudent(tas) {
    return tas.map((ta) => {
      const taId = ta.id;
      const oldCurrentWinner = ta.currentTaWinner;
      // array of cards from each students array of cards
      let taCards = [];
      ta.taStudents.map((student) => {
        taCards = [...taCards, ...student.studentPbisCards];
        return null;
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

      return {
        taWinner,
        newCardsPerStudent,
        taId,
        numberOfStudentsInTa,
        oldCurrentWinner,
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

  async function updateAllDataForWinners() {
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

    // get the lowest level ta team
    const lowestLevelTaTeam = teamInfo.reduce(
      (prev, curr) => (prev.currentLevel > curr.currentLevel ? prev : curr),
      {}
    );
    // if lowest level ta level is even then set currentPBIS level to lowest level +2 otherwise +1
    const pbisGoal =
      lowestLevelTaTeam.currentLevel % 2 === 0
        ? lowestLevelTaTeam.currentLevel + 2
        : lowestLevelTaTeam.currentLevel + 1;
    setCurrentPbisTeamGoal(pbisGoal);
  }

  async function runCardCollection() {
    // await updateAllDataForWinners();
    const thePersonalLevelWinners = getPersonalLevelWinners(
      data.studentsWithCurrentCounts
    );
    const theRandomDrawingWinners = await getTaWinnerAndCardsPerStudent(
      data.taTeachers
    );
    const theTaTeamLevels = await getTaTeamCardsPerStudent(
      data.taTeams,
      theRandomDrawingWinners
    );
    const theTaTeamNewLevelWinners = getTaTeamsAtNewLevel(theTaTeamLevels);

    const today = new Date().toLocaleDateString();
    const name = `Card Collection ${today}`;

    const lowestLevelTaTeam = theTaTeamLevels.reduce(
      (prev, curr) => (prev.currentLevel > curr.currentLevel ? prev : curr),
      {}
    );
    const thePbisGoal =
      lowestLevelTaTeam.currentLevel % 2 === 0
        ? lowestLevelTaTeam.currentLevel + 2
        : lowestLevelTaTeam.currentLevel + 1;
    console.log(thePbisGoal);

    createNewPbisCollection({
      variables: {
        name,
        randomDrawingWinners: JSON.stringify(theRandomDrawingWinners),
        personalLevelWinners: JSON.stringify(thePersonalLevelWinners),
        taTeamLevels: JSON.stringify(theTaTeamLevels),
        taTeamNewLevelWinners: JSON.stringify(theTaTeamNewLevelWinners),
        currentPbisTeamGoal: thePbisGoal.toString(),
      },
    });
    return name;
  }

  const results = {
    randomDrawingWinners,
    personalLevelWinners,
    taTeamLevels,
    taTeamNewLevelWinners,
    currentPbisTeamGoal,
  };

  return {
    runCardCollection,
    data,
    setGetData,
    getData,
    results,
  };
}
