import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TitleBox from 'components/boxes/TitleBox';
import VideoBox from 'components/boxes/VideoBox';
import SectionBox from 'components/boxes/SectionBox';

type Result = {
  file_name: string;
  transcription: string;
  summary: string;
};

type UploadTabProps = {
  videoFile: File | null;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
  sections: string[];
  setSections: React.Dispatch<React.SetStateAction<string[]>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setTranscription: React.Dispatch<React.SetStateAction<string>>;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
};

const UploadTab = ({
  videoFile,
  setVideoFile,
  sections,
  setSections,
  setFileName,
  setTranscription,
  setSummary,
}: UploadTabProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;
    setVideoFile(event.target.files[0]);
  };

  const handleSectionChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index] = value;
    setSections(updatedSections);
  };

  const addSection = () => setSections([...sections, '']);
  const deleteSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleGetSummary = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('sections', JSON.stringify(sections));

    try {
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
      const result = await response.json();
      setFileName(result.file_name);
      setTranscription(result.transcription);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <Stack direction="column" spacing={2} alignItems="center">
          <TitleBox label="Title:" />
          <VideoBox onChange={handleFileUpload} />
          <SectionBox
            sections={sections}
            onSectionChange={handleSectionChange}
            onAddSection={addSection}
            onDeleteSection={deleteSection}
          />
        </Stack>
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
        <Box
          sx={{
            width: '100%',
            height: '300px',
            backgroundColor: '#F8F9F9',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {videoFile ? (
            <video width="90%" height="90%" controls>
              <source
                src={URL.createObjectURL(videoFile)}
                type={videoFile.type}
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Placeholder Image
            </Typography>
          )}
        </Box>
        <Button
          onClick={handleGetSummary}
          variant="contained"
          color="primary"
          disabled={!videoFile}
          sx={{
            textTransform: 'none',
            marginTop: 2,
            width: '80%',
            borderRadius: '10px',
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '17px' }}>
            Generate Summary
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default UploadTab;
