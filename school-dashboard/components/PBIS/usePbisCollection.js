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
    students.map((student) => {
      const oldLevel = student.individualPbisLevel;
      const newLevel = Math.floor(
        student._studentPbisCardsMeta.count / cardsPerPersonalLevel
      );
      if (oldLevel !== newLevel) {
        student.individualPbisLevel = newLevel;
        setPersonalLevelWinners([...personalLevelWinners, student]);
      }
    });
    console.log(personalLevelWinners);
  }

  function chooseRandomCardFromArrayOfCards(cards) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    return card;
  }

  function chooseARandomWinnerFromTaCardsThatDoesntMatchCurrentWinner(
    arrayOfCards,
    previousWinner
  ) {
    // choose a random card from the cards that doesn't match the current winner
    if (arrayOfCards.length === 0) {
      return {};
    }

    const cardsToChooseFrom = arrayOfCards.filter(
      (card) => card.student.id !== previousWinner.id
    );
    if (cardsToChooseFrom.length === 0) {
      return arrayOfCards[0];
    }

    const randomCard = chooseRandomCardFromArrayOfCards(cardsToChooseFrom);
    return randomCard;
  }

  function getTaWinnerAndCardsPerStudent(tas) {
    tas.map((ta) => {
      const taId = ta.id;
      const oldCurrentWinner = ta.currentTaWinner;
      const taCards = ta.taStudents.map((student) => student.studentPbisCards);
      const taWinner = chooseARandomWinnerFromTaCardsThatDoesntMatchCurrentWinner(
        taCards,
        oldCurrentWinner
      );
    });
  }

  async function runCardCollection() {
    setRunning(true);
    const studentWinners = getPersonalLevelWinners(
      data.studentsWithCurrentCounts
    );
    const taWinners = getTaWinnerAndCardsPerStudent(data.taTeachers);
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
