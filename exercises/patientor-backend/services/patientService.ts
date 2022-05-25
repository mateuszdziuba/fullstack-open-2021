import patients from '../data/patients';
import { NewPatient, PublicPatient, Patient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): PublicPatient[] => {
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
  const newPatient: Patient = {
    id,
    ...person
  };
  patients.push(newPatient);
  return newPatient;
};

const entries: Entry[] = [];

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  if (patient) {
    return {
      ...patient,
      entries
    };
  }
  return patient;
};

export default {
  getAll,
  addPatient,
  getPatient
};
