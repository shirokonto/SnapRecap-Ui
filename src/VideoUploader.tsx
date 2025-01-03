import React, { useState, SyntheticEvent } from 'react';
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
import { Grid2 } from '@mui/material';

type Result = {
  file_name: string;
  transcription: TranscriptionChunk[];
  summary: string;
};

const VideoUploader = () => {
  const [tab, setOpenedTab] = useState('1');

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [sections, setSections] = useState<string[]>(['']);
  const [fileName, setFileName] = useState('');
  const [transcription, setTranscription] = useState<TranscriptionChunk[]>([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
            {/* TODO replace CircularProgress with MUI Skeleton? */}
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
  );
};

export default VideoUploader;
