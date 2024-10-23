import PatientSchema from "./utils";
import { z } from 'zod';

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export type NewPatient = z.infer<typeof PatientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;