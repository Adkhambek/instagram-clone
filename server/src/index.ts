import connectDB from "./utils/database";
import UserModel from "./models/UserModel";
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import http from "http";
import keys from "./config/keys";

const PORT = keys.port;

const typeDefs = gql`
    type Query {
        users: [Users]
    }
    type Users {
        email: String
        fullName: String
        username: String
        password: String
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            return UserModel.find();
        },
    },
};

const startApolloServer = async (typeDefs: any, resolvers: any) => {
    const app = express();
    app.use("/public", express.static("./uploads"));
    const httpServer = http.createServer(app);
    const apollo = new ApolloServer({
        resolvers,
        typeDefs,
    });
    await connectDB();
    await apollo.start();
    apollo.applyMiddleware({ app });
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
    );
};

startApolloServer(typeDefs, resolvers);

// (async function () {
//     await connectDB();
//     const newUser = new UserModel({
//         email: "muzaffarov.adham@gmail.com",
//         fullName: "Muzaffarov Adham",
//         username: "Heaven_8",
//         password: "heaven12345678",
//     });
//     await newUser.save();
// })();
