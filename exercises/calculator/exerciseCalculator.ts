interface ExerciseValues {
  value1: number;
  value2: number[];
}

const parseArguments2 = (args: Array<string>): ExerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const removedArgs = args.splice(0, 3);
  const totalNumber = removedArgs[2];
  
  if(!isNaN(Number(totalNumber)) && args.every(n => !isNaN(Number(n)))) {
    return {
      value1: Number(totalNumber),
      value2: args.map(n => Number(n))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, dailyExerciseHours: number[]): ExerciseResult => {

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce((prev, curr) => prev + (curr === 0 ? 0 : 1), 0);
  const average = dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / periodLength;
  let rating = 2; 
  let ratingDescription = 'not too bad but could be better';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'good keep it up';
  }

  if (average < 0.66 * target) {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { value1, value2 } = parseArguments2(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Error occured.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.error(errorMessage);
}