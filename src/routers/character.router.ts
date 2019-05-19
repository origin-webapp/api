import express from 'express';
import Character from '../db/models/character.model';
import CharacterStats from '../db/models/character-stats.model';
import Power from '../db/models/power.model';
import PowerMechanic from '../db/models/power-mechanic.model';

// all routes defiend with this object will imply /characters
export const characterRouter = express.Router(); // routers represent a subset of routes for the express application


const includeAll = [
  { model: CharacterStats },
  { model: Power, include: [PowerMechanic] },
];

/**
 * Find character by id
 */
characterRouter.get('/:id', async (req, res) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving character with id  ${id}`);
  try {
    const character = await Character.findByPk(id, {
      include: includeAll
    });
    res.json(character);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * Find character by creators email
 */
characterRouter.get('/creator/:email', async (req, res) => {
  const email = req.params.email;
  console.log(`retreiving characters with creators email:  ${email}`);
  try {
    const characters = await Character.findAll({
      where: {
        creator: email
      },
      include: includeAll,
      order: [
        ['powers', 'name', 'asc'],
      ]
    });
    res.json(characters);
  } catch (err) {
    console.log(err);
    res.sendStatus(501);
  }
});

/**
 * Create Character
 */
characterRouter.post('', async (req, res) => {
  console.log('creating character');
  const character = req.body;
  try {
    const char = await Character.create(character, {
      include: [CharacterStats, Power]
    });
    res.status(201);
    res.json(char);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * Update Character
 */
characterRouter.patch('', async (req, res) => {
  console.log('updating character');
  const characterProvided = req.body;
  try {
    const dbStats = await Character.findByPk(characterProvided.id);
    await dbStats.update(characterProvided);
    const updatedCharacter = await Character.findByPk(characterProvided.id, {
      include: includeAll
    });
    res.json(updatedCharacter);
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
 * Delete Character
 */
characterRouter.delete('/:id', async (req, res) => {
  console.log('deleting character');
  const id = +req.params.id;
  try {
    await Character.destroy({
      where: {
        id
      }
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
      res.status(400);
      res.json(err.errors);
    }
    res.sendStatus(500);
  }
});
