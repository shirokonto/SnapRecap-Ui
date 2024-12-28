import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TitleBox from 'components/boxes/TitleBox';
import VideoBox from 'components/boxes/VideoBox';
import SectionBox from 'components/boxes/SectionBox';
import ImageBox from 'components/boxes/ImageBox';

type UploadTabProps = {
  videoFile: File | null;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
  videoTitle: string | null;
  setVideoTitle: React.Dispatch<React.SetStateAction<string | null>>;
  sections: string[];
  setSections: React.Dispatch<React.SetStateAction<string[]>>;
  handleGetSummary: () => Promise<void>;
};

const UploadTab = ({
  videoFile,
  setVideoFile,
  videoTitle,
  setVideoTitle,
  sections,
  setSections,
  handleGetSummary,
}: UploadTabProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <Stack direction="column" spacing={2} alignItems="center">
          <TitleBox label="Title:" />
          <VideoBox
            onVideoChange={handleFileUpload}
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
          />
          <SectionBox
            sections={sections}
            onSectionChange={handleSectionChange}
            onAddSection={addSection}
            onDeleteSection={deleteSection}
            setTestingSections={setSections}
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
        <ImageBox videoFile={videoFile} />
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
