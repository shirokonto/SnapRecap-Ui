import React, { useState } from 'react';
import TranscriptBox from 'components/boxes/TranscriptBox';
import { TranscriptionChunk } from 'types/transcription';
import SummaryBox from 'components/boxes/SummaryBox';
import { Box, Button, Grid2, Stack, Typography } from '@mui/material';
import IconButton from 'components/common/IconButton';
import ClosedCaptionOutlinedIcon from '@mui/icons-material/ClosedCaptionOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ImageBox from 'components/boxes/ImageBox';

const VerifyTab = ({
  transcription,
  summary,
  sections,
}: {
  transcription: TranscriptionChunk[];
  summary: string;
  sections: string[];
}) => {
  const [activeTab, setActiveTab] = useState<
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
              onClick={() =>
                setActiveTab(activeTab === 'transcript' ? null : 'transcript')
              }
              selected={activeTab === 'transcript'}
            />
            <IconButton
              label="Summary"
              icon={FontDownloadOutlinedIcon}
              onClick={() =>
                setActiveTab(activeTab === 'summary' ? null : 'summary')
              }
              selected={activeTab === 'summary'}
            />
            <IconButton
              label="Screenshots"
              icon={ImageOutlinedIcon}
              onClick={() =>
                setActiveTab(activeTab === 'screenshots' ? null : 'screenshots')
              }
              selected={activeTab === 'screenshots'}
            />
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Left Side */}
            <Box sx={{ flex: 1 }}>
              {activeTab === 'transcript' && (
                <TranscriptBox
                  transcription={transcription}
                  sections={sections}
                />
              )}
              {activeTab === 'summary' && (
                <SummaryBox summary={summary} sections={sections} />
              )}
              {activeTab === 'screenshots' && (
                <>
                  <h3>Screenshots:</h3>
                  <p>Add screenshots on the right?</p>
                </>
              )}
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
              <ImageBox videoFile={null} />
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={1} />
      </Grid2>
    </Box>
  );
};

export default VerifyTab;
