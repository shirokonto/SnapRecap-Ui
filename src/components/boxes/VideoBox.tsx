import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface VideoBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoBox = (props: VideoBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9F9',
        padding: '16px',
        borderRadius: '8px',
        color: '#555555',
        width: '100%',
      }}
    >
      {/* Text on the Left */}
      <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
        Video:
      </Typography>

      {/* File upload option on the Right */}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        sx={{
          textTransform: 'none',
          borderRadius: '10px',
        }}
      >
        Upload Video
        <input
          type="file"
          accept="video/*"
          onChange={props.onChange}
          style={{ display: 'none' }}
        />
      </Button>
    </Box>
  );
};

export default VideoBox;
