import { Box, Typography, TextField, Stack } from '@mui/material';
import { TranscriptionChunk } from 'types/transcription';
import { parseTimestamp } from 'utils/TimestampParsingUtil';

interface TranscriptBoxProps {
  transcription: TranscriptionChunk[];
  onJumpTo: (timestamp: number) => void;
}

const TranscriptBox = ({ transcription, onJumpTo }: TranscriptBoxProps) => {
  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: '#F8F9F9',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Full view transcription */}
        <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
          Transcription:
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: '#555555', fontWeight: 'light' }}
      >
        Click on any time stamp or word below to jump to the part of the video.
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
              onClick={() => onJumpTo(parseTimestamp(chunk.start_time))}
            >
              {`[${chunk.start_time} - ${chunk.end_time}]`}
            </Typography>
            <TextField
              variant="standard"
              multiline
              contentEditable={false}
              value={chunk.text}
              fullWidth
              onClick={() => onJumpTo(parseTimestamp(chunk.start_time))}
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
