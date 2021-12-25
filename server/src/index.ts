import connectDB from "./utils/database";
import graphqlServer from "./graphql";
import express from "express";
import http from "http";
import keys from "./config/keys";

const PORT = keys.port;

const startApolloServer = async () => {
    const app = express();
    app.use("/public", express.static("./uploads"));
    const httpServer = http.createServer(app);

    await connectDB();
    await graphqlServer.start();
    graphqlServer.applyMiddleware({ app });
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
};

startApolloServer();
