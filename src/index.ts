// this will be the entry point for our application
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { characterRouter } from './routers/character.router';

import './db';
import { characterStatsRouter } from './routers/character-stats.router';
import { powerRouter } from './routers/power.router';
import { powerMechanicRouter } from './routers/power-mechanic.router';
// create the app object from express
const app = express();

// set the port
const port = process.env.PORT || 5500; // will use port from computers environment variables or 3000 if there is none
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
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  next();
});
/*********************************************************************************************
 * API Routers
 ********************************************************************************************/
app.use('/characters', characterRouter);
app.use('/character-stats', characterStatsRouter);
app.use('/powers', powerRouter);
app.use('/power-mechanics', powerMechanicRouter);


app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
