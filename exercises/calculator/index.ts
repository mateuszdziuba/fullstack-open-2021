import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.height || isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.json({ error: 'malformatted parameters'});
  } else {
    res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.send({ error: 'parameters missing' }).status(400);
  }
  if (isNaN(Number(target)) || daily_exercises.some((n:string) => isNaN(Number(n)))) {
    return res.send({ error: 'malformatted parameters' }).status(400);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
