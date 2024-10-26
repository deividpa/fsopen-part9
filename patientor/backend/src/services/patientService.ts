// import patients from '../data/patients';
import patients from '../data/patients';
import { Entry, EntryWithoutId, NewPatient } from '../types';
import { Patient, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
    entries: [] as Entry[]
  };
  patients.push(patient);
  return patient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntry
};
