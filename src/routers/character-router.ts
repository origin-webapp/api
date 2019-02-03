import express from 'express';
import Character from '../db/models/character.model';
import CharacterStats from '../db/models/character-stats.model';
import Power from '../db/models/power.model';
import PowerMechanic from '../db/models/power-mechanic.model';

// all routes defiend with this object will imply /movies
export const characterRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find character by id
 */
characterRouter.get('/:id', async (req, res) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving character with id  ${id}`);
  try {
    const character = await Character.findByPk(id, {
      include: [
        { model: CharacterStats },
        { model: Power, include: [PowerMechanic] },
      ]
    });
    res.json(character);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * Find character by email
 */
characterRouter.get('/email/:email', async (req, res) => {
  const email = req.params.email;
  console.log(`retreiving character with email  ${email}`);
  res.sendStatus(501);
});

/**
 * Create Character
 */
characterRouter.post('', async (req, res) => {
  console.log('creating character');
  res.sendStatus(501);
});

