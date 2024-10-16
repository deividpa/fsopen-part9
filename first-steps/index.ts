import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const port = 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi
  });
});


app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  if (daily_exercises.some((ex: any) => isNaN(Number(ex)))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, Number(target));
  
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});