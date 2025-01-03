import React, { useState } from 'react';
import TranscriptBox from 'components/boxes/TranscriptBox';
import { TranscriptionChunk } from 'types/transcription';
import SummaryBox from 'components/boxes/SummaryBox';
import { Box, Grid2 } from '@mui/material';
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
              onClick={() =>
                setActiveSideTab(
                  activeSideTab === 'transcript' ? null : 'transcript',
                )
              }
              selected={activeSideTab === 'transcript'}
            />
            <IconButton
              label="Summary"
              icon={FontDownloadOutlinedIcon}
              onClick={() =>
                setActiveSideTab(activeSideTab === 'summary' ? null : 'summary')
              }
              selected={activeSideTab === 'summary'}
            />
            <IconButton
              label="Screenshots"
              icon={ImageOutlinedIcon}
              onClick={() =>
                setActiveSideTab(
                  activeSideTab === 'screenshots' ? null : 'screenshots',
                )
              }
              selected={activeSideTab === 'screenshots'}
            />
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Left Side */}
            <Box sx={{ flex: 1 }}>
              {activeSideTab === 'transcript' && (
                <TranscriptBox
                  transcription={transcription}
                  sections={sections}
                />
              )}
              {activeSideTab === 'summary' && (
                <SummaryBox summary={summary} sections={sections} />
              )}
              {activeSideTab === 'screenshots' && (
                <>
                  <h3>Screenshots:</h3>
                  <p>
                    Choose screenshots on the right, will be presented in export
                    to drag them
                  </p>
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
