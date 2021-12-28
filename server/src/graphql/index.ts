import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { protectedResolver } from "../utils/auth";

const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) =>
        await protectedResolver(req.headers.authorization as string),
});

export default apolloServer;
