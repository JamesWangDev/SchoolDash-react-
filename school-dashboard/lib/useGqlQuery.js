import { useQuery } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';
import { endpoint } from '../config';

export const useGQLQuery = (key, query, variables, config = {}) => {
  const headers = {
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);
  // console.log(GraphQLClient);
  const fetchData = async () => await graphQLClient.request(query, variables);

  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};
