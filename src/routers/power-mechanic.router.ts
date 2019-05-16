import express from 'express';
import PowerMechanic from '../db/models/power-mechanic.model';

// all routes defiend with this object will imply /power-mechanics
export const powerMechanicRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Get all Power Mechanics
 */
powerMechanicRouter.get('', async (req, res) => {
  try {
    const mechanics = await PowerMechanic.findAll();
    res.json(mechanics);
  } catch (err) {
    res.sendStatus(500);
  }
});

/**
 * Create Power Mechanic
 */
powerMechanicRouter.post('', async (req, res) => {
  const mechanicProvided = req.body;
  try {
    await PowerMechanic.create(mechanicProvided);
    res.json(mechanicProvided);
  } catch (err) {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
      res.status(400);
      res.json(err.errors);
    }
    else {
      res.sendStatus(500);
    }
  }
});

/**
 * Update Power Mechanic
 */
powerMechanicRouter.patch('', async (req, res) => {
  console.log('updating power mechanic');
  const mechanicProvided = req.body;
  try {
    const dbStats = await PowerMechanic.findByPk(mechanicProvided.id);
    await dbStats.update(mechanicProvided);
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

