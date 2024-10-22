import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { PatientSchema } from '../utils';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
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

export default router;
