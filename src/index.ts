// this will be the entry point for our application
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { characterRouter } from './routers/character.router';

import './db';
import { characterStatsRouter } from './routers/character-stats.router';
// create the app object from express
const app = express();

// set the port
const port = process.env.ORIGIN_PORT || 5500; // will use port from computers environment variables or 3000 if there is none
app.set('port', port);

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'public'))
);

// use the body parser to convert request json
app.use(bodyParser.json());

// allow cross origins
app.use((req, resp, next) => {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  next();
});
/*********************************************************************************************
 * API Routers
 ********************************************************************************************/
app.use('/characters', characterRouter);
app.use('/character-stats', characterStatsRouter);


app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
