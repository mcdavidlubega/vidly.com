const { application } = require('express');
const express = require('express');
const router = express.Router();
const validateInput = require('../helpers/routesValidateInput');
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

// Get A Specific Genres
router.get('/:id', (req, res) => {
  const getGenre = genres.find((q) => q.id === parseInt(req.params.id, 10));
  const { error } = validateInput(req.body);
  if (error) req.status(401).send(error.details[0].message);
  if (!error) {
    res.json(getGenre);
  }

  res.json(getGenres);
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const deleteGenre = genres.findIndex((g) => g.id === parseInt(req.params.id));
  genres.splice(deleteGenre, 1);
  res.json(genres);
});

module.exports = router;
