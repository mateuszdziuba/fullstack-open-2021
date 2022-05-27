import { Gender, NewPatient, NewEntry, HealthCheckRating } from './types';

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  dischargeDate: unknown;
  dischargeCriteria: unknown;
  sickLeaveStartDate: unknown;
  sickLeaveEndDate: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseoOcupation(occupation),
    entries: []
  };

  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

const parseDateOfBirth = (date: unknown): string => {
  // if (!date || !isString(date) || !isDate(date)) {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn ' + ssn);
  }

  return ssn;
};

const parseoOcupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }

  return occupation;
};

export default toNewPatient;

export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  dischargeDate,
  dischargeCriteria,
  employerName,
  sickLeaveStartDate,
  sickLeaveEndDate
}: EntryFields): NewEntry => {
  const newEntry = {
    description: parseString('description', description),
    date: parseDate(date),
    specialist: parseString('specialist', specialist),
    diagnosisCodes: parseCodes(diagnosisCodes)
  };

  switch (parseString('type', type)) {
    case 'HealthCheck':
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealtchCheckRating(healthCheckRating)
      };
    case 'Hospital':
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(dischargeDate),
          criteria: parseString('discharge criteria', dischargeCriteria)
        }
      };
    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString('employer', employerName),
        sickLeave: {
          startDate: parseDate(sickLeaveStartDate),
          endDate: parseDate(sickLeaveEndDate)
        }
      };
    default:
      throw new Error('Incorrect entry type');
  }
};

const parseString = (stringLabel: string, string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing ${stringLabel}`);
  }

  return string;
};

const isRating = (param: number): param is HealthCheckRating => {
  console.log(param);
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealtchCheckRating = (rating: any): HealthCheckRating => {
  if (rating === null || isNaN(rating) || !isRating(rating)) {
    throw new Error('Incorrect or missing rating');
  }

  return rating;
};

const parseDate = (date: unknown): string => {
  // if (!date || !isString(date) || !isDate(date)) {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseCodes = (codes: any): string[] => {
  if (!codes) {
    throw new Error('Incorrect or missing codes');
  }

  return codes;
};
