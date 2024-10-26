import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from '@mui/material';
import patientService from "../services/patients";
import { Patient, Diagnosis, Entry } from "../types";
import PatientDetails from "./PatientListPage/PatientDetails";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diagnoses, setDiagnoses] = useState<{ [code: string]: Diagnosis }>({});

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getPatientById(id as string);
        setPatient(fetchedPatient);
      } catch (err) {
        setError("Error fetching patient data");
      } finally {
        setLoading(false);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const diagnosesData = await patientService.getDiagnoses();
        const diagnosesMap = diagnosesData.reduce((acc: { [code: string]: Diagnosis }, diagnosis: Diagnosis) => {
          acc[diagnosis.code] = diagnosis;
          return acc;
        }, {});
        setDiagnoses(diagnosesMap);
      } catch (err) {
        console.error("Error fetching diagnoses", err);
      }
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>No patient found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name} {patient.gender === 'male' ? '♂' : '♀'}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant="h6" style={{ marginTop: '1em' }}>entries</Typography>
      {patient.entries.map((entry: Entry) => (
        <Box key={entry.id} style={{ marginBottom: '1em', border: '1px solid black', padding: '1em' }}>
          <PatientDetails entry={entry} />
        </Box>
      ))}
    </Box>
  );
};

export default PatientDetailPage;