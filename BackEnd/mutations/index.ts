import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
// import addToCart from './addToCart'
// import checkout from './checkout'
// make a fake gql tagged template Literal
import recalculatePBIS from './recalculatePBIS'

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      
      recalculatePBIS(userId: ID): User
    }
  `,
  resolvers: {
    Mutation: {
      
      recalculatePBIS,
    },
  },
});
