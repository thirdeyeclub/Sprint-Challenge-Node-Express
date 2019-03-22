const express = require('express');
const actions = require('./routes/actions');
const projects = require('./routes/project');

const server = express();


server.use(actions);
server.use(projects);

server.get("/", (req, res) => {
    res.send(`<h1>welcome</h1>`);
});

module.exports = server;