import React, { useState } from 'react';
import { Box, Grid2 } from '@mui/material';
import ClosedCaptionOutlinedIcon from '@mui/icons-material/ClosedCaptionOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { TranscriptionChunk } from 'src/types/transcription';
import IconButton from 'components/common/IconButton';
import SummarySideTab from 'components/side-tabs/Verify/SummarySideTab';
import TranscriptSideTab from 'components/side-tabs/Verify/TranscriptSideTab';
import ScreenshotSideTab from 'components/side-tabs/Verify/ScreenshotSideTab';

const VerifyTab = ({
  transcription,
  summary,
  sections,
}: {
  transcription: TranscriptionChunk[];
  summary: string;
  sections: string[];
}) => {
  const [activeSideTab, setActiveSideTab] = useState<
    'transcript' | 'summary' | 'screenshots' | null
  >('transcript');

  return (
    <Box>
      <Grid2
        container
        spacing={2}
        marginX={8}
        sx={{ justifyContent: 'center' }}
      >
        <Grid2 size={1}>
          <Box
            id="iconbutton-list-container"
            gap={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <IconButton
              label="Transcript"
              icon={ClosedCaptionOutlinedIcon}
              onClick={() => setActiveSideTab('transcript')}
              selected={activeSideTab === 'transcript'}
            />
            <IconButton
              label="Summary"
              icon={FontDownloadOutlinedIcon}
              onClick={() => setActiveSideTab('summary')}
              selected={activeSideTab === 'summary'}
            />
            <IconButton
              label="Screenshots"
              icon={ImageOutlinedIcon}
              onClick={() => setActiveSideTab('screenshots')}
              selected={activeSideTab === 'screenshots'}
            />
          </Box>
        </Grid2>
        <Grid2 size={8}>
          {activeSideTab === 'transcript' && (
            <TranscriptSideTab
              transcription={transcription}
              sections={sections}
            />
          )}
          {activeSideTab === 'summary' && (
            <SummarySideTab summary={summary} sections={sections} />
          )}
          {activeSideTab === 'screenshots' && <ScreenshotSideTab />}
        </Grid2>
        <Grid2 size={1} />
      </Grid2>
    </Box>
  );
};

export default VerifyTab;