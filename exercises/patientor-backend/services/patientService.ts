import patients from '../data/patients';
import { NewPatient, PatientNoSsn, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const id: string = uuid();

const addPatient = (person: NewPatient): Patient => {
  const newPatient = {
    id,
    ...person
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient
};
