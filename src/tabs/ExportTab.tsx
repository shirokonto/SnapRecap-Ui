import React, { useState } from 'react';
import { Alert, Box, Button, Grid2, Snackbar, Typography } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconButton from 'components/common/IconButton';
import ConfluenceSideTab from 'components/side-tabs/Export/ConfluenceSideTab';

type ExportTabProps = {
  summaryTitle: string | undefined;
  summary: string;
};

const ExportTab = ({ summaryTitle, summary }: ExportTabProps) => {
  const [confluencePageId, setConfluencePageId] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<'confluence' | 'download'>(
    'confluence',
  );
  const [activeUploadOption, setActiveUploadOption] = useState<
    'update' | 'create'
  >('update');
  const [spaceKey, setSpaceKey] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar for responses
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );
  const [snackbarMessage, setSnackbarMessage] = useState('');

  //const mockContent = `<h1>This is a new test page</h1><p>This is the last test with mock data</p><img src="https://picsum.photos/200/300" alt="Example Image" />`;

  const handleUploadToConfluence = async () => {
    activeUploadOption === 'update'
      ? await handleUpdateOnConfluence()
      : await handleCreateNewOnConfluence();
  };

  const handleCreateNewOnConfluence = async () => {
    if (!confluencePageId || confluencePageId === '') {
      console.error('Parent page ID is not set');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('parent_id', confluencePageId);
      formData.append('title', summaryTitle ? summaryTitle : 'New summary');
      formData.append('content', summary);
      formData.append('space_key', '~s0' + spaceKey); // Space Key starts with ~s0 in URL
      formData.append('api_token', apiToken);

      const response = await fetch('http://localhost:8000/postonconfluence', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Failed to create page:', result);
        setSnackbarMessage('Upload successful');
        setSnackbarSeverity('success');
      } else {
        const errorText = await response.text();
        console.error('Failed to create page:', response.status, errorText);
        setSnackbarMessage(`Error: ${errorText}`);
        setSnackbarSeverity('error');
      }
    } catch (error: any) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setIsLoading(false);
    }
  };

  const handleUpdateOnConfluence = async () => {
    if (!confluencePageId || confluencePageId === '') {
      console.error('Parent page ID is not set');
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', '');
      formData.append('content', summary);
      formData.append('page_id', confluencePageId);
      formData.append('space_key', '~s0' + spaceKey); // Space Key starts with ~s0 in URL
      formData.append('api_token', apiToken);

      const response = await fetch('http://localhost:8000/updateonconfluence', {
        method: 'PUT',
        body: formData,
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Page updated successfully:', result);
        setSnackbarMessage('Page updated successfully');
        setSnackbarSeverity('success');
      } else {
        const errorText = await response.text();
        console.error('Failed to update page:', response.status, errorText);
        setSnackbarMessage(`Error: ${errorText}`);
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } catch (error: any) {
      console.error('Error while updating page:', error);
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setIsLoading(false);
    }
  };

  const handlePageIdChange = (pageId: string) => {
    setConfluencePageId(pageId);
  };

  return (
    <Box>
      <Grid2 container spacing={2} marginX={8} justifyContent={'center'}>
        <Grid2 size={1}>
          <Box
            id="iconbutton-list-container"
            gap={2}
            display={'flex'}
            flexDirection={'column'}
          >
            <IconButton
              label="Confluence"
              icon={BackupOutlinedIcon}
              onClick={() => setActiveSideTab('confluence')}
              selected={activeSideTab === 'confluence'}
            />
            <IconButton
              label="Download"
              icon={FileDownloadOutlinedIcon}
              onClick={() => setActiveSideTab('download')}
              selected={activeSideTab === 'download'}
            />
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <Box display={'flex'} flexDirection={'row'} gap={2}>
            {/* Left Side */}
            {activeSideTab === 'confluence' && (
              <ConfluenceSideTab
                activeUploadOption={activeUploadOption}
                setActiveUploadOption={setActiveUploadOption}
                handlePageIdChange={handlePageIdChange}
                handleUploadToConfluence={handleUploadToConfluence}
                confluencePageId={confluencePageId}
                spaceKey={spaceKey}
                setSpaceKey={setSpaceKey}
                apiToken={apiToken}
                setUserApiToken={setApiToken}
                isLoading={isLoading}
              />
            )}
            {/* Right Side */}
            <Box
              flex={1}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Typography
                variant="h5"
                marginBottom={2}
                color={'#3f3f3f'}
                fontWeight={'bold'}
              >
                Page Preview: {summaryTitle ? summaryTitle : 'New summary'}
              </Typography>
              <Box
                flex={1}
                border={'1px solid #ccc'}
                borderRadius={'5px'}
                padding={2}
                sx={{
                  backgroundColor: '#fff',
                  overflowY: 'auto',
                  maxHeight: '80vh',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: summary }}
                  style={{
                    padding: '10px',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.6',
                  }}
                />
              </Box>
              {activeSideTab === 'download' && (
                <Button
                  onClick={() => console.log('Download button clicked')}
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    marginTop: 2,
                    width: '80%',
                    borderRadius: '10px',
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '17px' }}>
                    Download Page as PDF / Word
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={1} />
      </Grid2>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExportTab;
