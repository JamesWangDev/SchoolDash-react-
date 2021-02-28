import { useMutation } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';
import { endpoint } from '../config';

export const useGQLMutation = (key, query, variables, config = {}) => {
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);
  console.log(GraphQLClient);
  const fetchData = async () => await graphQLClient.request(query, variables);

  // const fetchData = async () => await request(endpoint, query, variables);

  return useMutation(key, fetchData, config);
};
