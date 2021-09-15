import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/jokes/', async (req, res) => {
  let data = [];

  for (let i = 0; i < 10; i++) {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const joke = await response.json();
    data.push(joke.value);
  }

  res.send(data);
});

app.get('/api/jokes/:amount', async (req, res, next) => {
  const amount = parseInt(req.params.amount);
  if (!isNaN(amount)) {
    let data = [];

    for (let i = 0; i < amount; i++) {
      const response = await fetch(`https://api.chucknorris.io/jokes/random`);
      const joke = await response.json();
      data.push(joke.value);
    }

    res.json(data);
  } else next();
});

app.get('/api/jokes/:category', async (req, res) => {
  if (typeof req.params.category == 'string') {
    let category = req.params.category;

    let data = [];

    for (let i = 0; i < 10; i++) {
      const response = await fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      );
      const joke = await response.json();
      data.push(joke.value);
    }

    res.json(data);
  } else res.send(400).json({ message: 'Parameters are written wrong' });
});

app.get('/api/jokes/:category/:amount', async (req, res) => {
  let category = req.params.category;
  let amount = +req.params.amount;

  let data = [];

  for (let i = 0; i < amount; i++) {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );

    const joke = await response.json();

    data.push(joke.value);
  }

  res.json(data);
});

//Starting server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
