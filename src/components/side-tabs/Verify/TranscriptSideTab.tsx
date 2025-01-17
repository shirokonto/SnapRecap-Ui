import React from 'react';
import { Box } from '@mui/material';
import TranscriptBox from 'components/boxes/TranscriptBox';
import ImageBox from 'components/boxes/ImageBox';
import { TranscriptionChunk } from 'types/transcription';

interface TranscriptSideTabProps {
  transcription: TranscriptionChunk[];
  sections: string[];
  videoFile: File | undefined;
}

const TranscriptSideTab = ({
  transcription,
  sections,
  videoFile,
}: TranscriptSideTabProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <TranscriptBox transcription={transcription} sections={sections} />
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
        <ImageBox videoFile={videoFile} />
      </Box>
    </Box>
  );
};

export default TranscriptSideTab;
