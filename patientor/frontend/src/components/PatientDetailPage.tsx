import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import patientService from "../services/patients";
import { Patient, Entry, Diagnosis } from "../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        <Box key={entry.id} style={{ marginBottom: '1em' }}>
          <Typography variant="body1">
            <strong>{entry.date}</strong> {entry.description}
          </Typography>
          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map(code => (
                <ListItem key={code}>
                  <ListItemText>
                    <Typography component="span" variant="body2">
                      {code} {diagnoses[code]?.name && ` - ${diagnoses[code].name}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PatientDetailPage;