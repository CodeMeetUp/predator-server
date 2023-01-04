/**
 * @description Express Server
 * @file server.js
 * @author code meetUp
 */

require('dotenv').config();
const express = require('express');
const app = express();
const compression = require('compression');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const admin = require('firebase-admin');

const PORT = process.env.APP_PORT || 3000;
const mongoUri = process.env.MONGO_DB_URI;
// const appPrefix = process.env.APP_PREFIX || 'v1';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
