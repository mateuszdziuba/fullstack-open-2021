const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <>
    {parts.map((p) => (
      <Part key={p.name} part={p} />
    ))}
  </>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const title = (
    <strong>
      {part.name} {part.exerciseCount}
    </strong>
  );

  switch (part.type) {
    case 'normal':
      return (
        <p>
          {title} <br />
          {part.description}
        </p>
      );
    case 'groupProject':
      return (
        <p>
          {title} <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          {title} <br />
          {part.description}
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          {title} <br />
          {part.description}
          <br />
          requirements: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

// interface CoursePartBase {
//   name: string;
//   exerciseCount: number;
// }

// interface CoursePartOne extends CoursePartBase {
//   name: 'Fundamentals';
//   description: string;
// }

// interface CoursePartTwo extends CoursePartBase {
//   name: 'Using props to pass data';
//   groupProjectCount: number;
// }

// interface CoursePartThree extends CoursePartBase {
//   name: 'Deeper type usage';
//   description: string;
//   exerciseSubmissionLink: string;
// }

// type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBase2 {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase2 {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase2 {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const App = () => {
  const courseName = 'Half Stack application development';
  // const courseParts = [
  //   {
  //     name: 'Fundamentals',
  //     exerciseCount: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exerciseCount: 7
  //   },
  //   {
  //     name: 'Deeper type usage',
  //     exerciseCount: 14
  //   }
  // ];

  // const courseParts: CoursePart[] = [
  //   {
  //     name: 'Fundamentals',
  //     exerciseCount: 10,
  //     description: 'This is an awesome course part'
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exerciseCount: 7,
  //     groupProjectCount: 3
  //   },
  //   {
  //     name: 'Deeper type usage',
  //     exerciseCount: 14,
  //     description: 'Confusing description',
  //     exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
  //   }
  // ];

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal'
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission'
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special'
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
