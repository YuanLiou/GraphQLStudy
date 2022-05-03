const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // you can access all your request on context
    context: ({ req }) => {
        return { req }
    }
});

server.listen().then(({ url }) => {
    console.log(`Apollo server listening ${url} :)`);
});