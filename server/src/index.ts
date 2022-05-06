import socket from './socket';
import * as http from 'http';
import 'reflect-metadata';
import { normalizePort } from './common';

const port = normalizePort(process.env.PORT || '9000');

const app = require('express')()

const useRouter = require('./routes')

const httpServer = http.createServer(app);

app.set('port', port);

httpServer.listen(port);

useRouter(app)

const socketServer = socket(httpServer)

console.log('Сервер запущен');

