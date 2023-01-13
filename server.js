/**
 * @description Express Server
 * @file server.js
 * @author code meetUp
 */

require('dotenv').config();
const express = require('express'); // express is the framework that we are going to use to create server routes.
const app = express();
const compression = require('compression'); // provides compression middleware to compress request bodies from client to server
const mongoose = require('mongoose'); // database driver, it allows us to talk to the database from nodejs/js and model your data
const cors = require('cors'); // cors is a middleware that allows us to make cross origin requests
const helmet = require('helmet'); // helmet is a middleware that allows us to set security headers
const admin = require('firebase-admin'); // sdk to manage the firebase product
const path = require('path');
const userRoute = require('./src/router/user.router');

const PORT = process.env.APP_PORT || 3000;
const mongoUri = process.env.MONGO_DB_URI;
// const appPrefix = process.env.APP_PREFIX || 'v1';

// Initialize the middleware for the express app
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// Add support for serving the react build files from the server itself
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/v1', userRoute);

const serviceAccount = require('./service-account.json');

// Initialize the firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Configure the database connection to MongoDB
let server;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => {
  server = app.listen(PORT, () => {
    const { port } = server.address();
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${port}`);
  });
});

module.exports = app;