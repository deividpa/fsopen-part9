import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { PatientSchema, toNewEntry } from '../utils';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req: Request, res: Response) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientData = PatientSchema.parse(req.body);

    const newPatient = {
        id: uuid(),
        ...newPatientData,
    };

    const addedPatient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
} catch (error: unknown) {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        res.status(400).send({ error: 'unknown error' });
    }
}
});

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const patient = patientService.getPatientById(req.params.id);

    if (!patient) {
      res.status(404).send({ error: 'Patient not found' });
    } else {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(patient, newEntry);
      res.status(201).json(addedEntry);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});



export default router;
