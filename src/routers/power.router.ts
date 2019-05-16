import express from 'express';
import Power from '../db/models/power.model';
import PowerMechanic from '../db/models/power-mechanic.model';

// all routes defiend with this object will imply /powers
export const powerRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Update Power
 */
powerRouter.patch('', async (req, res) => {
  console.log('updating power info');
  const powerProvided = req.body;
  try {
    console.log(powerProvided);
    let retreivedPower = await Power.findByPk(powerProvided.id);
    await retreivedPower.update(powerProvided);

    retreivedPower = await Power.findByPk(powerProvided.id, {include: [{model: PowerMechanic}]});
    res.json(retreivedPower);
  } catch (err) {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
      res.status(400);
      res.json(err.errors);
    }
    res.sendStatus(500);
  }
});


/**
 * Create Power
 */
powerRouter.post('', async (req, res) => {
  const powerProvided = req.body;
  try {
    const createdPower = await Power.create(powerProvided);
    res.status(201);
    res.json(createdPower);
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
 * Delete Power
 */
powerRouter.delete('/:id', async (req, res) => {
  const powerId = +req.params.id;
  try {
    const power = await Power.findByPk(powerId);
    if (power) {
      await power.destroy();
    }
    res.sendStatus(200);
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
