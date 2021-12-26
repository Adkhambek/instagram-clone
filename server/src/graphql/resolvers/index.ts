import { userQueries, accountMutations } from "./user";

const resolvers = {
    Query: {
        ...userQueries,
    },
    Mutation: {
        ...accountMutations,
    },
};

export default resolvers;
