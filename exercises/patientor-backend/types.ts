type Gender = 'male' | 'female';

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn?: string;
}

export type PatientNoSsn = Omit<Patient, 'ssn'>;
