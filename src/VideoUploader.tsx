import React, { useState, SyntheticEvent } from 'react';
import { Box, Tab, Typography, CircularProgress } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ExportTab from 'tabs/ExportTab';
import VerifyTab from 'tabs/VerifyTab';
import UploadTab from 'tabs/UploadTab';
import { TranscriptionChunk } from 'types/transcription';
import SnackBar from './components/common/SnackBar';

type Result = {
  file_name: string;
  transcription: TranscriptionChunk[];
  summary: string;
};

const VideoUploader = () => {
  const [tab, setOpenedTab] = useState('1');

  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
  const [videoTitle, setVideoTitle] = useState<string | undefined>(undefined);
  const [summaryTitle, setSummaryTitle] = useState<string | undefined>(
    undefined,
  );
  const [transcription, setTranscription] = useState<TranscriptionChunk[]>([]);

  const [sections, setSections] = useState<string[]>(['']);
  const [summarizeWithSections, setSummarizeWithSections] = useState(false);
  const [summary, setSummary] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Snackbar for responses
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info'
  >('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTabChange = (event: SyntheticEvent, tabToOpen: string) => {
    if (!summary && (tabToOpen === '2' || tabToOpen === '3')) {
      console.error('First generate a summary');
      setSnackbarMessage('Generate a summary first');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
      return;
    }
    setOpenedTab(tabToOpen);
  };

  const handleGenerateSummary = async () => {
    if (!videoFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', videoFile);
    const sectionsToSummarize = summarizeWithSections ? sections : [''];
    formData.append('sections', JSON.stringify(sectionsToSummarize));

    try {
      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
      const result: Result = await response.json();
      setTranscription(result.transcription);
      setSummary(result.summary);
      setOpenedTab('2'); // Switch to Verify tab
    } catch (error) {
      console.error('Error uploading video:', error);
      setSnackbarMessage(`Error uploading video ${error}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}
        >
          Summarize Video
        </Typography>
        <TabContext value={tab}>
          <Box
            id="tab-list-container"
            paddingLeft={48}
            sx={{
              width: '100%',
              maxWidth: '1200px',
              typography: 'body1',
              marginTop: 2,
              borderColor: 'divider',
            }}
          >
            <TabList onChange={handleTabChange}>
              <Tab label="Upload" value="1" />
              <Tab label="Verify" value="2" />
              <Tab label="Export" value="3" />
            </TabList>
          </Box>
          {/* tab-panels */}
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
                summaryTitle={summaryTitle}
                setSummaryTitle={setSummaryTitle}
                handleGenerateSummary={handleGenerateSummary}
                setVideoTitle={setVideoTitle}
                sections={sections}
                summarizeWithSections={summarizeWithSections}
                setSummarizeWithSections={setSummarizeWithSections}
                setSections={setSections}
              />
            )}
          </TabPanel>
          <TabPanel value="2">
            <VerifyTab
              transcription={transcription}
              summary={summary}
              sections={sections}
              setSummary={setSummary}
              videoFile={videoFile}
            />
          </TabPanel>
          <TabPanel value="3">
            <ExportTab summaryTitle={summaryTitle} summary={summary} />
          </TabPanel>
        </TabContext>
      </Box>
      <SnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default VideoUploader;
