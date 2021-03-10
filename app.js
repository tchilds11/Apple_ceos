'use strict';
const http = require('http'),
    hostname = '127.0.0.1',
    port = 3001;

const express = require('express'),
    es6Renderer = require('express-es6-template-engine');

const app = express();
    
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

// public folder for all public items 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
});

const rootController = require('./routes/index'),
    ceosController = require('./routes/ceos');

app.use('/', rootController);
app.use('/ceos', ceosController);