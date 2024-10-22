import { z } from 'zod';
import { Gender } from './types';

export const PatientSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    dateOfBirth: z.string().date(),
    ssn: z.string().min(1, { message: "SSN is required" }),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export type NewPatient = z.infer<typeof PatientSchema>;

// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const parseName = (name: unknown): string => {
//     if (!name || !isString(name)) {
//         throw new Error('Incorrect or missing name');
//     }
//     return name;
// };

// const parseDateOfBirth = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error('Incorrect or missing date of birth');
//     }
//     return date;
// };

// const isGender = (param: string): param is Gender => {
//     return Object.values(Gender).includes(param as Gender);
// };

// const parseGender = (gender: unknown): Gender => {
//     if (!gender || !isString(gender) || !isGender(gender)) {
//         throw new Error('Incorrect or missing gender');
//     }
//     return gender;
// };

// const parseOccupation = (occupation: unknown): string => {
//     if (!occupation || !isString(occupation)) {
//         throw new Error('Incorrect or missing occupation');
//     }
//     return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//     if (!ssn || !isString(ssn)) {
//         throw new Error('Incorrect or missing SSN');
//     }
//     return ssn;
// };

// const toNewPatient = (object: unknown): NewPatient => {

//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing object');
//     }

//     if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
//         const newPatient: NewPatient = {
//             name: parseName(object.name),
//             dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//             gender: parseGender(object.gender),
//             occupation: parseOccupation(object.occupation),
//             ssn: parseSsn(object.ssn),
//         };
    
//         return newPatient;
//     }

//     throw new Error('Incorrect data: some fields are missing');
// };

export default PatientSchema;