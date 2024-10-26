// import patients from '../data/patients';
import patients from '../data/patients';
import { Entry, NewPatient } from '../types';
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


export default {
  getNonSensitivePatients,
  getPatientById,
  addPatient
};
