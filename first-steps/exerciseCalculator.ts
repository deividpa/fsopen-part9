import { isNotNumber } from './utils/utils';

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((acc, hours) => acc + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  
  let rating: number;
  let ratingDescription: string;
  
  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job, target met!';
  } else if (average >= target * 0.7) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if(require.main === module) {
  const args = process.argv.slice(2);

  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(Number);

  if (isNotNumber(target)) {
    console.log("Error: The target value must be a valid number.");
    process.exit(1);
  }

  if (dailyHours.some(isNotNumber)) {
    console.log("Error: All daily exercise hours must be valid numbers.");
    process.exit(1);
  }

  const result = calculateExercises(dailyHours, target);
  console.log(result);
}
