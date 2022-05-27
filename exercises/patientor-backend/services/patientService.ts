import patients from '../data/patients';
import { NewPatient, PublicPatient, Patient, Entry, NewEntry } from '../types';
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
const entryId: string = uuid();

const addPatient = (person: NewPatient): Patient => {
  const newPatient: Patient = {
    id,
    ...person
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  return patient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  const newEntry: Entry = {
    id: entryId,
    ...entry
  };
  if (!patient) {
    throw new Error('Incorrect patient id');
  }
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getAll,
  addPatient,
  getPatient,
  addEntry
};
