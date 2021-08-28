import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUser } from '../User';

const CREATE_PBIS_COLLECTION_MUTATION = gql`
  mutation CREATE_PBIS_COLLECTION_MUTATION(
    $name: String!
    $randomDrawingWinners: String!
    $personalLevelWinners: String!
    $taTeamLevels: String!
    $taTeamNewLevelWinners: String!
  ) {
    createPbisCollection(
      data: {
        name: $name
        randomDrawingWinners: $randomDrawingWinners
        personalLevelWinners: $personalLevelWinners
        taTeamLevels: $taTeamLevels
        taTeamNewLevelWinners: $taTeamNewLevelWinners
      }
    ) {
      id
    }
  }
`;

export default function useCreateMessage() {
  const queryClient = useQueryClient();
  const me = useUser();
  const [collection, setPbisCollection] = useState();
  //   console.log(`message: ${JSON.stringify(message)}`);

  const [createNewPbisCollection] = useMutation(
    CREATE_PBIS_COLLECTION_MUTATION,
    {
      variables: {
        name: collection.name,
        randomDrawingWinners: JSON.stringify(collection.randomDrawingWinners),
        personalLevelWinners: JSON.stringify(collection.personalLevelWinners),
        taTeamLevels: JSON.stringify(collection.taTeamLevels),
        taTeamNewLevelWinners: JSON.stringify(collection.taTeamNewLevelWinners),
      },
    }
  );
  useEffect(() => {
    if (collection) {
      // console.log('creating new pbis collection');
      // console.log(`collection: ${JSON.stringify(collection)}`);
      createNewPbisCollection();
      setTimeout(() => {
        queryClient.refetchQueries();
      }, 1000);
    }
  }, [collection]);

  return setPbisCollection;
}
