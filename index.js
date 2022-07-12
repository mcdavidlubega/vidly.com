const { json } = require('express');
const express = require('express');

const Joi = require('joi');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Vidly');
});
app.listen(port, console.log(`Listening on ${port} ...`));

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
app.get('/genres', (req, res) => {
  res.json(genres);
});

//Post a Genre
app.post('/genres', (req, res) => {
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
app.put('/genres/:id', (req, res) => {
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
app.delete('/genres/:id', (req, res) => {
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
