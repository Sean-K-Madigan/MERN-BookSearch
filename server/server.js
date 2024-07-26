const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Apply Apollo Server middleware to the Express app
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();

// unsure of this is correct??
