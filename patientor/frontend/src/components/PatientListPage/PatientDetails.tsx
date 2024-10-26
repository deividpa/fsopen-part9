import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import { Typography, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, yellow, red } from '@mui/material/colors';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthCheckRatingColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return green[500];
      case 1:
        return yellow[500];
      case 2:
        return 'orange';
      case 3:
        return red[500];
      default:
        return undefined;
    }
  };

  return (
    <Box>
      <Typography>{entry.date} <LocalHospitalIcon /></Typography>
      <Typography>{entry.description}</Typography>
      <FavoriteIcon style={{ color: healthCheckRatingColor() }} />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Box>
      <Typography>{entry.date} <LocalHospitalIcon /></Typography>
      <Typography>{entry.description}</Typography>
      <Typography>Discharge on {entry.discharge.date} - {entry.discharge.criteria}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Box>
      <Typography>{entry.date} <WorkIcon /></Typography>
      <Typography>{entry.description}</Typography>
      {entry.employerName && <Typography>Employer: {entry.employerName}</Typography>}
      {entry.sickLeave && (
        <Typography>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>
      )}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;