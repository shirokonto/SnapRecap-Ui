import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import { TranscriptionChunk } from 'types/transcription';

const TranscriptBox = ({
  transcription,
  sections,
}: {
  transcription: TranscriptionChunk[];
  sections: string[];
}) => {
  const [section, setSelectedSection] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSection(event.target.value as string);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: '#F8F9F9',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        {/* Text on the Left */}
        <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
          Transcription:
        </Typography>
        {/* Jump to Section Dropdown on the Right */}
        <FormControl
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            marginLeft: '16px',
            flex: 1,
          }}
        >
          <InputLabel id="demo-simple-select-label">Jump to</InputLabel>
          <Select
            value={section}
            label="Jump to Section"
            onChange={handleChange}
          >
            {sections.map((section, index) => (
              <MenuItem key={index} value={section}>
                {section}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: '#555555', fontWeight: 'light' }}
      >
        Click on any word below to edit.
      </Typography>
      {/* Transcription Field with Scrollbar */}
      <Box
        sx={{
          backgroundColor: '#F8F9F9',
          borderRadius: '8px',
          overflow: 'auto',
          maxHeight: 300,
          padding: '8px',
        }}
      >
        {transcription.map((chunk, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: '16px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#333',
                fontWeight: 'bold',
                marginBottom: '4px',
              }}
            >
              {`[${chunk.start_time} - ${chunk.end_time}]`}
            </Typography>
            <TextField
              variant="standard"
              multiline
              value={chunk.text}
              fullWidth
              InputProps={{
                disableUnderline: true, // Disable the underline
              }}
              sx={{
                backgroundColor: '#FFFFFF',
                padding: '8px',
              }}
            />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default TranscriptBox;
