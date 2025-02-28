import React, { useState } from 'react';
import { Box } from '@mui/material';
import TranscriptBox from 'components/boxes/TranscriptBox';
import VideoBox from 'components/boxes/VideoBox';
import { TranscriptionChunk } from 'types/transcription';

interface TranscriptSideTabProps {
  transcription: TranscriptionChunk[];
  videoFile: File | undefined;
}

const TranscriptSideTab = ({
  transcription,
  videoFile,
}: TranscriptSideTabProps) => {
  const [jumpTimestamp, setJumpTimestamp] = useState<number | null>(null);

  const handleJumpTo = (timestamp: number) => {
    setJumpTimestamp(timestamp);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <TranscriptBox transcription={transcription} onJumpTo={handleJumpTo} />
      </Box>
      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <VideoBox videoFile={videoFile} jumpTo={jumpTimestamp} />
      </Box>
    </Box>
  );
};

export default TranscriptSideTab;
