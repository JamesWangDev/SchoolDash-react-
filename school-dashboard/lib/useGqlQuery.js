import { useQuery } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';
import { endpoint, prodEndpoint } from '../config';

export const useGQLQuery = (key, query, variables, config = {}) => {
  const headers = {
    credentials: 'include',
    mode: 'cors',
    // headers: {
    //   authorization: `Bearer token goes here`,
    // },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  // console.log(GraphQLClient);
  const fetchData = async () => await graphQLClient.request(query, variables);
// console.log(document)
  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};

export const useAsyncGQLQuery = (query) => {
  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `Bearer token goes here`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  // console.log(GraphQLClient);
  const fetchData = async (variables) =>
    await graphQLClient.request(query, variables);

  return fetchData;
};
