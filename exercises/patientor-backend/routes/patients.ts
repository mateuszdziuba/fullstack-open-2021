import express from 'express';
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

export default router;
