import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
  Typography,
} from '@mui/material';

interface SummarySwitchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const SummarySwitch = ({ onChange, isChecked }: SummarySwitchProps) => {
  return (
    <FormGroup>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" color="#555555" fontWeight="light">
          Whole Video
        </Typography>
        <FormControlLabel
          control={
            <MaterialUISwitch
              checked={isChecked}
              onChange={onChange}
              sx={{ m: 1, fontWeight: 'light' }}
              defaultChecked
            />
          }
          label="Sections"
        />
      </Stack>
    </FormGroup>
  );
};

// path d retrieved via DevTools svg - path - d
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(40px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M14 2H4c-1.11 0-2 .9-2 2v10h2V4h10zm4 4H8c-1.11 0-2 .9-2 2v10h2V8h10zm2 4h-8c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2"/></svg>')`, // AutoAwesomeMotionIcon for checked state
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...(theme.palette.mode === 'dark' && {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M10 16.5l6-4.5-6-4.5v9z"/></svg>')`, // SmartDisplayIcon for whole video
    },
    ...(theme.palette.mode === 'dark' && {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...(theme.palette.mode === 'dark' && {
      backgroundColor: '#8796A5',
    }),
  },
}));

export default SummarySwitch;
