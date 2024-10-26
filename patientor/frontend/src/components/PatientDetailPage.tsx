import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from '@mui/material';
import patientService from "../services/patients";
import { Patient, Entry } from "../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

    fetchPatient();
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
      <Typography variant="h4">{patient.name}</Typography>
      <Typography variant="h6">Gender: {patient.gender}</Typography>
      <Typography variant="h6">SSN: {patient.ssn}</Typography>
      <Typography variant="h6">Occupation: {patient.occupation}</Typography>
      <Typography variant="h6">Date of Birth: {patient.dateOfBirth}</Typography>
      <Typography variant="h6">Entries:</Typography>
      {patient.entries.map((entry: Entry) => (
        <Box key={entry.id}>
          <Typography variant="h6">{entry.type}</Typography>
          <Typography>{entry.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientDetailPage;