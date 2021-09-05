import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';
import {
  getTaTeamData,
  getPersonalLevel,
  getRandomWinners,
  getLowestTaTeamLevel,
  getNewTaTeamLevelGoal,
  getTeachersToUpdate,
  getTaTeamsToUpdate,
  getPbisCardsToMarkCollected,
  getListOfStudentsToUpdate,
} from './pbisCollectionHelpers';

const PBIS_COLLECTION_QUERY = gql`
  query PBIS_COLLECTION_QUERY {
    taTeamCards: allPbisTeams {
      id
      teamName
      averageCardsPerStudent
      numberOfStudents
      currentLevel

      taTeacher {
        id
        name
        currentTaWinner {
          id
          name
        }
        previousTaWinner {
          id
          name
        }
        taStudents {
          id
          name
          individualPbisLevel
          uncountedCards: _studentPbisCardsMeta(where: { counted: false }) {
            count
          }
          totalCards: _studentPbisCardsMeta {
            count
          }
        }
      }
    }
    totalCards: _allPbisCardsMeta(where: { counted: false }) {
      count
    }
    lastCollection: allPbisCollections {
      id
      name
      collectionDate
      personalLevelWinners
      randomDrawingWinners
      taTeamsLevels
    }
    individualPbisCards: allPbisCards(where: { counted: false }) {
      id
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
const BULK_UPDATE_USERS_MUTATION = gql`
  mutation BULK_UPDATE_USERS_MUTATION($data: [UsersUpdateInput]) {
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
  const [getData, setGetData] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  const [bulkUpdateUsers] = useMutation(BULK_UPDATE_USERS_MUTATION, {});

  const [createNewPbisCollection] = useMutation(
    CREATE_PBIS_COLLECTION_MUTATION,
    {}
  );
  const { data } = useGQLQuery(
    'pbisCollection',
    PBIS_COLLECTION_QUERY,
    {},
    { enabled: !!getData }
  );

  async function runCardCollection() {
    setLoading(true);
    // get all the level data for each PBIS team
    const taTeamData = getTaTeamData(data.taTeamCards);
    console.log('Team Data', taTeamData);
    // get all the teams that went up a level for rewards
    const taTeamsAtNewLevel = taTeamData.filter((taTeam) => taTeam.isNewLevel);
    console.log('Teams at new level', taTeamsAtNewLevel);
    // get all the studets who went up a level for rewards
    const studentsWithNewPersonalLevel = getPersonalLevel(data.taTeamCards);
    console.log(
      'Students with new personal level',
      studentsWithNewPersonalLevel
    );
    // get all the random drawing winners
    const randomDrawingWinners = getRandomWinners(data.taTeamCards);
    console.log('Random drawing winners', randomDrawingWinners);
    // get the lowest PBIS team level
    const lowestTaTeamLevel = getLowestTaTeamLevel(taTeamData);
    console.log('Lowest ta team level', lowestTaTeamLevel);
    // get the team PBIS  level goal
    const newTaTeamLevelGoal = getNewTaTeamLevelGoal(lowestTaTeamLevel);
    console.log('New ta team level goal', newTaTeamLevelGoal);

    const pbisCollectionData = {
      name: `PBIS Collection ${new Date().toLocaleDateString()}`,
      personalLevelWinners: JSON.stringify(studentsWithNewPersonalLevel),
      randomDrawingWinners: JSON.stringify(randomDrawingWinners),
      taTeamLevels: JSON.stringify(taTeamData),
      taTeamNewLevelWinners: JSON.stringify(taTeamsAtNewLevel),
      currentPbisTeamGoal: JSON.stringify(newTaTeamLevelGoal),
      collectedCards: String(data.totalCards.count),
    };

    // create the new PBIS Collection
    const latestCollection = await createNewPbisCollection({
      variables: pbisCollectionData,
    });
    console.log('Latest collection', latestCollection);

    // update the students who went up a level
    const studentsToUpdateLevel = studentsWithNewPersonalLevel.map(
      (student) => ({
        id: student.id,
        data: {
          individualPbisLevel: student.individualPbisLevel,
        },
      })
    );
    const updatedStudents = await bulkUpdateUsers({
      variables: { data: studentsToUpdateLevel },
    });
    console.log('Updated students', updatedStudents);
    // update each ta teacher with their new pbis winner
    const teachersToUpdate = getTeachersToUpdate(randomDrawingWinners);

    const updatedTeachers = await bulkUpdateUsers({
      variables: {
        data: teachersToUpdate,
      },
    });
    console.log('Updated teachers', updatedTeachers);

    // update each ta team with their new data
    const taTeamsToUpdate = getTaTeamsToUpdate(taTeamData);
    console.log('Ta teams to update', taTeamsToUpdate);
    const updatedPbisTeams = await updatePbisTeamData({
      variables: {
        data: taTeamsToUpdate,
      },
    });
    console.log('Updated pbis teams', updatedPbisTeams);
    // mark all new cards as collected
    const cardsToUpdate = getPbisCardsToMarkCollected(data.individualPbisCards);
    // console.log('Cards to update', cardsToUpdate);
    const updatedCards = await countCardsMutation({
      variables: {
        data: cardsToUpdate,
      },
    });
    console.log('Updated cards', updatedCards);
    // update the pbis cards for each student
    const studentsToUpdate = getListOfStudentsToUpdate(data.taTeamCards);
    const recalculatedPBIS = await Promise.all(
      studentsToUpdate.map((student) =>
        updateCardCount({
          variables: {
            userId: student,
          },
        })
      )
    );
    console.log('Recalculated PBIS', recalculatedPBIS);

    setLoading(false);
    return 'it Worked';
  }

  return {
    runCardCollection,
    data,
    setGetData,
    getData,
    loading,
  };
}
