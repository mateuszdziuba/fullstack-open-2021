type Operation = 'multiply' | 'add' | 'divide';

// const calculator = (a: number, b: number, op: Operation) => {
//   if (op === 'multiply') {
//     return a * b;
//   }
//   if (op === 'add') {
//     return a + b;
//   }
//   if (op === 'divide') {
//     if (b === 0) return 'can\'t divide by 0!';
//     return a / b;
//   }
// }

// calculator(1, 2, 'yolo');

const calculator = (a: number, b: number, op: Operation): number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!')
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add, or divide!')
  }
}

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.error(errorMessage)
}

console.log(process.argv)