import express from 'express';
import CharacterStats from '../db/models/character-stats.model';

// all routes defiend with this object will imply /movies
export const characterStatsRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Update Character Stats
 */
characterStatsRouter.patch('', async (req, res) => {
  console.log('updating character stats');
  const statsProvided = req.body;
  try {
    const dbStats = await CharacterStats.findByPk(statsProvided.id);
    await dbStats.update(statsProvided);
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

