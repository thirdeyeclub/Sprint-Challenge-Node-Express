const express = require('express');
const actions = require('./routes/actions');
const projects = require('./routes/project');

const server = express();

server.use(actions);
server.use(projects);

module.exports = server;