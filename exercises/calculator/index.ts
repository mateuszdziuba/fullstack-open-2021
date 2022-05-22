import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.height || isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.json({ error: 'malformatted parameters'})
  } else {
    res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)))
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
