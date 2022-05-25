import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();
import patientsService from '../services/patientService';
import toNewPatient from '../utils';

router.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

export default router;
