const { application } = require('express');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
  {
    id: 1,
    genre: 'Horror',
  },
  {
    id: 2,
    genre: 'Action',
  },
  {
    id: 3,
    genre: 'Commedy',
  },
  {
    id: 4,
    genre: 'Drama',
  },
];

// Get Genres
router.get('/', (req, res) => {
  res.json(genres);
});

//Post a Genre
router.post('/', (req, res) => {
  const error = validateInput(req.body);
  if (error) res.status(400).send(error.details[0].message);

  if (!error) {
    const newGenre = {
      id: genres.length + 1,
      body: req.body.genre,
    };
    genres.push(newGenre);
    res.json(newGenre);
  }
});
//Update a Genere
router.put('//:id', (req, res) => {
  const error = validateInput(req.body);
  if (error) res.status(400).send(error.details[0].message);
  if (!error) {
    const updateGenre = genres.find(
      (g) => g.id === parseInt(req.params.id, 10)
    );
    res.status(200);
    updateGenre.genre = req.body.genre;
    res.json(updateGenre);
  }
});

//Delete a Genre
router.delete('//:id', (req, res) => {
  const deleteGenre = genres.findIndex((g) => g.id === parseInt(req.params.id));
  genres.splice(deleteGenre, 1);
  res.json(genres);
});

//Joi validation function
function validateInput(genre) {
  const schema = {
    id: Joi.number(),
    genre: Joi.string().min(3).required(),
  };

  const { error } = Joi.validate(genre, schema);

  return error;
}

module.exports = router;
