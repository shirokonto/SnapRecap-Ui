import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface VideoBoxProps {
  videoFile: File | undefined;
  jumpTo?: number | null;
}

const VideoBox = ({ videoFile, jumpTo }: VideoBoxProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (jumpTo !== undefined && jumpTo !== null && videoRef.current) {
      videoRef.current.currentTime = jumpTo;
      videoRef.current.play();
    }
  }, [jumpTo]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '300px',
        backgroundColor: '#F8F9F9',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {videoFile ? (
        <video ref={videoRef} width="90%" height="90%" controls>
          <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Placeholder Image
        </Typography>
      )}
    </Box>
  );
};

export default VideoBox;
