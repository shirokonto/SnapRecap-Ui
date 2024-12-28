import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ExportTab from 'components/tabs/ExportTab';
import VerifyTab from 'components/tabs/VerifyTab';
import UploadTab from 'components/tabs/UploadTab';
import Typography from '@mui/material/Typography';

const VideoUploader = () => {
  const [value, setValue] = useState('1');

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [sections, setSections] = useState<string[]>(['']);
  const [fileName, setFileName] = useState('');
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        paddingX: '10%',
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}
      >
        Summarize Video
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          typography: 'body1',
          marginTop: 2,
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderColor: 'divider',
                paddingLeft: '24px',
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Upload" value="1" />
                {/* TODO Gray out if Generating Summary failed*/}
                <Tab label="Verify" value="2" />
                <Tab label="Export" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <UploadTab
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                sections={sections}
                setSections={setSections}
                setFileName={setFileName}
                setTranscription={setTranscription}
                setSummary={setSummary}
              />
            </TabPanel>
            <TabPanel value="2">
              <VerifyTab summary={summary} transcription={transcription} />
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
