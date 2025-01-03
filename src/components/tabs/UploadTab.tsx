import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Box, Button, Stack, Typography, Grid2 } from '@mui/material';
import TitleBox from 'components/boxes/TitleBox';
import VideoBox from 'components/boxes/VideoBox';
import SectionBox from 'components/boxes/SectionBox';
import ImageBox from 'components/boxes/ImageBox';

type UploadTabProps = {
  videoFile: File | null;
  setVideoFile: Dispatch<SetStateAction<File | null>>;
  videoTitle: string | null;
  setVideoTitle: Dispatch<SetStateAction<string | null>>;
  sections: string[];
  setSections: Dispatch<SetStateAction<string[]>>;
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
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Box>
      <Grid2
        container
        spacing={2}
        marginX={8}
        sx={{ justifyContent: 'center' }}
      >
        <Grid2 size={1} />
        <Grid2 size={8}>
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
        </Grid2>
        <Grid2 size={1} />
      </Grid2>
    </Box>
  );
};

export default UploadTab;
