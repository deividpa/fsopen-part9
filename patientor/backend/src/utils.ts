import { z } from 'zod';
import {
  Gender,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
  EntryWithoutId,
  BaseEntry
} from './types';

export const PatientSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  ssn: z.string().min(1, { message: 'SSN is required' }),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
});

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const baseEntry = toNewBaseEntry(object);

  switch ((object as { type: string }).type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating((object as { healthCheckRating: unknown }).healthCheckRating),
      } as HealthCheckEntry;

    case 'Hospital':
      if (!('discharge' in object) || !isString((object as { discharge: { date: string; criteria: string } }).discharge.date) || !isString((object as { discharge: { date: string; criteria: string } }).discharge.criteria)) {
        throw new Error('Incorrect or missing discharge information');
      }
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: (object as { discharge: { date: string; criteria: string } }).discharge.date,
          criteria: (object as { discharge: { date: string; criteria: string } }).discharge.criteria,
        },
      } as HospitalEntry;

    case 'OccupationalHealthcare':
      if (!('employerName' in object) || !isString((object as { employerName: string }).employerName)) {
        throw new Error('Incorrect or missing employer name');
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: (object as { employerName: string }).employerName,
        sickLeave: 'sickLeave' in object
          ? {
              startDate: parseDate((object as { sickLeave: { startDate: string } }).sickLeave.startDate),
              endDate: parseDate((object as { sickLeave: { endDate: string } }).sickLeave.endDate),
            }
          : undefined,
      } as OccupationalHealthcareEntry;

    default:
      throw new Error(`Unknown entry type: ${(object as { type: string }).type}`);
  }
};

// Validaciones auxiliares
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !Object.values(HealthCheckRating).includes(rating as HealthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return rating as HealthCheckRating;
};

const toNewBaseEntry = (object: unknown): Omit<BaseEntry, 'id'> => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  return {
    description: parseDescription((object as { description: unknown }).description),
    date: parseDate((object as { date: unknown }).date),
    specialist: parseSpecialist((object as { specialist: unknown }).specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<string>;
  }
  return (object as { diagnosisCodes: Array<string> }).diagnosisCodes;
};

export default PatientSchema;