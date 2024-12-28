import React from 'react';
import TranscriptBox from 'components/boxes/TranscriptBox';
import { TranscriptionChunk } from 'types/transcription';
import SummaryBox from 'components/boxes/SummaryBox';
import Stack from '@mui/material/Stack';

const VerifyTab = ({
  transcription,
  summary,
  sections,
}: {
  transcription: TranscriptionChunk[];
  summary: string;
  sections: string[];
}) => {
  return (
    <Stack direction="column" spacing={2}>
      <TranscriptBox transcription={transcription} sections={sections} />
      <SummaryBox summary={summary} sections={sections} />
      <h3>Screenshots:</h3>
      <p>Add screenshots on the right?</p>
    </Stack>
  );
};

export default VerifyTab;
