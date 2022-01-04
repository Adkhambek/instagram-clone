import { userQueries, userMutations } from "./user";
import { followingQueries, followingMutations } from "./following";

const resolvers = {
    Query: {
        ...userQueries,
        ...followingQueries,
    },
    Mutation: {
        ...userMutations,
        ...followingMutations,
    },
};

export default resolvers;
