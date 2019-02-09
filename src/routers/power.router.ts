import express from 'express';
import Power from '../db/models/power.model';

// all routes defiend with this object will imply /movies
export const powerRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Update Power
 */
powerRouter.patch('', async (req, res) => {
  console.log('updating power info');
  const powerProvided = req.body;
  try {
    const dbStats = await Power.findByPk(powerProvided.id);
    await dbStats.update(powerProvided);
    res.json(dbStats);
  } catch (err) {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
      res.status(400);
      res.json(err.errors);
    }
    res.sendStatus(500);
  }
});

