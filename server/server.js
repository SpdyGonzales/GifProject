const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test');

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/v1', router);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});