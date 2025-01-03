import React, { useState, SyntheticEvent, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import ExportTab from 'components/tabs/ExportTab';
import VerifyTab from 'components/tabs/VerifyTab';
import UploadTab from 'components/tabs/UploadTab';
import Typography from '@mui/material/Typography';
import { TranscriptionChunk } from 'types/transcription';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import ClosedCaptionOutlinedIcon from '@mui/icons-material/ClosedCaptionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import IconButton from 'components/common/IconButton';

type Result = {
  file_name: string;
  transcription: TranscriptionChunk[];
  summary: string;
};

const VideoUploader = () => {
  const [tab, setOpenedTab] = useState('1');
  const [iconButtonLeft, setIconButtonLeft] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [sections, setSections] = useState<string[]>(['']);
  const [fileName, setFileName] = useState('');
  const [transcription, setTranscription] = useState<TranscriptionChunk[]>([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(contentRef.current);
    if (contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      console.log(contentRect);
      setIconButtonLeft(contentRect.left - 87 - 48); // Place IconButtons to the left of the container
    }
  }, [tab]); // Recalculate when tab changes

  const handleTabChange = (event: SyntheticEvent, tabToOpen: string) => {
    setOpenedTab(tabToOpen);
  };

  const handleGetSummary = async () => {
    if (!videoFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('sections', JSON.stringify(sections));

    try {
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
      const result: Result = await response.json();
      console.log(result.transcription);
      setFileName(result.file_name);
      setTranscription(result.transcription);
      setSummary(result.summary);
      setOpenedTab('2'); // Switch to Verify tab
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative', // Enable positioning for child elements
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}
      >
        Summarize Video
      </Typography>

      {/* TODO fix position of IconButtons */}
      {tab === '2' && (
        <Box
          sx={{
            position: 'absolute', // Position IconButtons independently
            left: `${iconButtonLeft}px`, // Dynamically calculated position
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            width: '87px', // Fixed width for the icons
          }}
        >
          <IconButton label={'Transcript'} icon={ClosedCaptionOutlinedIcon} />
          <IconButton label={'Summary'} icon={FontDownloadOutlinedIcon} />
          <IconButton label={'Screenshots'} icon={ImageOutlinedIcon} />
        </Box>
      )}
      <Box
        id="tabs-and-content-container"
        ref={contentRef}
        sx={{
          width: '100%',
          maxWidth: '1200px',
          typography: 'body1',
          marginTop: 2,
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Box
              sx={{
                borderColor: 'divider',
                paddingLeft: '24px',
              }}
            >
              <TabList onChange={handleTabChange}>
                <Tab label="Upload" value="1" />
                <Tab label="Verify" value="2" />
                <Tab label="Export" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '300px',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <UploadTab
                  videoFile={videoFile}
                  setVideoFile={setVideoFile}
                  videoTitle={videoTitle}
                  setVideoTitle={setVideoTitle}
                  sections={sections}
                  setSections={setSections}
                  handleGetSummary={handleGetSummary}
                />
              )}
            </TabPanel>
            <TabPanel value="2">
              <VerifyTab
                transcription={transcription}
                summary={summary}
                sections={sections}
              />
            </TabPanel>
            <TabPanel value="3">
              <ExportTab fileName={fileName} summary={summary} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoUploader;
