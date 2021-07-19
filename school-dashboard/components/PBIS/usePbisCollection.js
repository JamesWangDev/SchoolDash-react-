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
    $collectedCards: String
  ) {
    createPbisCollection(
      data: {
        name: $name
        randomDrawingWinners: $randomDrawingWinners
        personalLevelWinners: $personalLevelWinners
        taTeamsLevels: $taTeamLevels
        taTeamNewLevelWinners: $taTeamNewLevelWinners
        currentPbisTeamGoal: $currentPbisTeamGoal
        collectedCards: $collectedCards
      }
    ) {
      id
    }
  }
`;
// update teachers with new winner and update old winner

const UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION = gql`
  mutation UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION(
    $id: ID!
    $currentTaWinner: ID!
    $previousTaWinner: ID!
  ) {
    updateUser(
      id: $id
      data: {
        currentTaWinner: { connect: { id: $currentTaWinner } }
        previousTaWinner: { connect: { id: $previousTaWinner } }
      }
    ) {
      id
    }
  }
`;
// update teachers with new pbis winner
const UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION_WITHOUT_PREVIOUS = gql`
  mutation UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION_WITHOUT_PREVIOUS(
    $id: ID!
    $currentTaWinner: ID!
  ) {
    updateUser(
      id: $id
      data: { currentTaWinner: { connect: { id: $currentTaWinner } } }
    ) {
      id
    }
  }
`;
// update PBIS Teams with new data
const UPDATE_PBIS_TEAM_WITH_NEW_DATA_MUTATION = gql`
  mutation UPDATE_PBIS_TEAM_WITH_NEW_DATA_MUTATION(
    $data: [PbisTeamsUpdateInput]
  ) {
    updatePbisTeams(data: $data) {
      id
    }
  }
`;

// update students who went up a personal level
const UPDATE_STUDENT_WITH_NEW_PBIS_LEVEL_MUTATION = gql`
  mutation UPDATE_STUDENT_WITH_NEW_PBIS_LEVEL_MUTATION(
    $data: [UsersUpdateInput]
  ) {
    updateUsers(data: $data) {
      id
    }
  }
`;

// mark all the cards as collected
const COUNT_PBIS_CARD_MUTATION = gql`
  mutation COUNT_PBIS_CARD_MUTATION($data: [PbisCardsUpdateInput]!) {
    updatePbisCards(data: $data) {
      id
    }
  }
`;
// recalculate the pbis cards from user
const UPDATE_PBIS = gql`
  mutation UPDATE_PBIS($userId: ID!) {
    recalculatePBIS(userId: $userId) {
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

  const [countCardsMutation] = useMutation(COUNT_PBIS_CARD_MUTATION, {});
  const [updateCardCount, { loading: cardLoading }] = useMutation(UPDATE_PBIS);

  const [updateTaTeacherWithoutPreviousWinner] = useMutation(
    UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION_WITHOUT_PREVIOUS,
    {}
  );
  const [updatePbisTeamData] = useMutation(
    UPDATE_PBIS_TEAM_WITH_NEW_DATA_MUTATION,
    {}
  );
  const [updateTaTeacherWithPreviousWinner] = useMutation(
    UPDATE_TEACHER_WITH_NEW_PBIS_WINNER_MUTATION,
    {}
  );
  const [updateUsersWithNewPersonalLevel] = useMutation(
    UPDATE_STUDENT_WITH_NEW_PBIS_LEVEL_MUTATION,
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

  function updateTaTeachersWithNewWinners(tas) {
    return tas.forEach((ta) => {
      const oldCurrentWinner = ta.oldCurrentWinner || null;
      const newWinner = ta.taWinner.studentId;
      const { taId } = ta;
      // console.log('old winner:', oldCurrentWinner);
      // console.log('new winner:', newWinner);
      // console.log('taId:', taId);
      if (!newWinner) {
        return;
      }
      if (oldCurrentWinner) {
        const updatedTA = updateTaTeacherWithPreviousWinner({
          variables: {
            id: taId,
            currentTaWinner: newWinner,
            previousTaWinner: oldCurrentWinner.id,
          },
        });
      } else {
        console.log('no old winner');
        const updatedTA = updateTaTeacherWithoutPreviousWinner({
          variables: {
            id: taId,
            currentTaWinner: newWinner,
          },
        });
      }
    });
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

  async function updatePbisDataFromListOfStudentsWhoGotCards(
    listOfStudentsWhoGotCards
  ) {
    const users = await listOfStudentsWhoGotCards.map((student) =>
      updateCardCount({
        variables: { userId: student },
      })
    );
    console.log('users', users);
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
      (prev, curr) => (prev.currentLevel < curr.currentLevel ? prev : curr),
      {}
    );
    console.log('lowest level ta team', lowestLevelTaTeam);
    const thePbisGoal =
      lowestLevelTaTeam.currentLevel % 2 === 0
        ? lowestLevelTaTeam.currentLevel + 2
        : lowestLevelTaTeam.currentLevel + 1;

    const cardsToCheckOff = data.uncountedCards.map((card) => ({
      id: card.id,
      data: {
        counted: true,
      },
    }));
    const studentsToUpdatePbis = data.uncountedCards.map((card) => ({
      id: card.student.id,
    }));

    const newPersonalLevelsForUpdateMutation = thePersonalLevelWinners.map(
      (student) => ({
        id: student.student,
        data: {
          individualPbisLevel: student.level,
        },
      })
    );
    const pbisTeamsDataForUpdateMutation = theTaTeamLevels.map((team) => ({
      id: team.id,
      data: {
        currentLevel: team.currentLevel,
        numberOfStudents: team.numberOfStudentsInTeam,
        averageCardsPerStudent: team.averageCardsPerStudent,
      },
    }));

    console.log(newPersonalLevelsForUpdateMutation);
    const updatedStudentLevels = await updateUsersWithNewPersonalLevel({
      variables: {
        data: newPersonalLevelsForUpdateMutation,
      },
    });

    // get unique students to update by ids
    const studentsToUpdatePbisUnique = studentsToUpdatePbis.reduce(
      (prev, curr) => {
        if (prev.includes(curr.id)) {
          return prev;
        }
        return prev.concat(curr.id);
      },
      []
    );
    const cardsCheckedOff = await countCardsMutation({
      variables: { data: cardsToCheckOff },
    });
    const collectedCards = data.uncountedCards.map((card) => ({
      category: card.category,
    }));
    const listOfCardCategories = collectedCards.reduce((prev, curr) => {
      if (prev.includes(curr.category)) {
        return prev;
      }
      return prev.concat(curr.category);
    }, []);
    // for each card category, get the number of cards in that category
    const cardCounts = listOfCardCategories.map((category) => ({
      category,
      count: collectedCards.filter((card) => card.category === category).length,
    }));
    // console.log('card counts', cardCounts);

    const newCollection = await createNewPbisCollection({
      variables: {
        name,
        randomDrawingWinners: JSON.stringify(theRandomDrawingWinners),
        personalLevelWinners: JSON.stringify(thePersonalLevelWinners),
        taTeamLevels: JSON.stringify(theTaTeamLevels),
        taTeamNewLevelWinners: JSON.stringify(theTaTeamNewLevelWinners),
        currentPbisTeamGoal: thePbisGoal.toString(),
        collectedCards: JSON.stringify(cardCounts),
      },
    });

    const updatedStudents = await updatePbisDataFromListOfStudentsWhoGotCards(
      studentsToUpdatePbisUnique
    );
    const updatedTas = await updateTaTeachersWithNewWinners(
      theRandomDrawingWinners
    );

    const updatedTeams = await updatePbisTeamData({
      variables: {
        data: pbisTeamsDataForUpdateMutation,
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
