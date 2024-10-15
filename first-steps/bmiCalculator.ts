function calculateBmi(height: number, weight: number): string {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal range';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}
  
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (!height || !weight || height <= 0 || weight <= 0) {
    console.log('Please provide valid height and weight as numbers greater than 0.');
} else {
    console.log(calculateBmi(height, weight));
}  