import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface VideoBoxProps {
  videoTitle: string | undefined;
  setVideoTitle: Dispatch<SetStateAction<string | undefined>>;
  onVideoChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const VideoUploadBox = ({
  videoTitle,
  setVideoTitle,
  onVideoChange,
}: VideoBoxProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setVideoTitle(file.name);
      onVideoChange(event);
    }
  };

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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {videoTitle && (
          <Typography
            variant="body2"
            sx={{ color: '#555555', fontWeight: 'bold', marginRight: '16px' }}
          >
            {videoTitle}
          </Typography>
        )}

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
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default VideoUploadBox;
