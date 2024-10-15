interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
  
    let rating;
    let ratingDescription;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'Excellent! You met or exceeded your target!';
    } else if (average >= target * 0.8) {
      rating = 2;
      ratingDescription = 'Not too bad but could be better';
    } else {
      rating = 1;
      ratingDescription = 'You need to train more to meet your goal';
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
  }
  
  const dailyHours = [3, 0, 2, 4.5, 0, 3, 1];
  const target = 2;
  
  console.log(calculateExercises(dailyHours, target));
  