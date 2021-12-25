import { userQueries } from "./user";

const resolvers = {
    Query: {
        ...userQueries,
    },
};

export default resolvers;
