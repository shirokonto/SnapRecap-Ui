import React, { useState } from 'react';
import { Box, Button, Grid2, Typography } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconButton from 'components/common/IconButton';
import ConfluenceSideTab from 'components/side-tabs/Export/ConfluenceSideTab';

type ExportTabProps = {
  fileName: string;
  summary: string;
};

const ExportTab = ({ fileName, summary }: ExportTabProps) => {
  const [confluencePageId, setConfluencePageId] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<'confluence' | 'download'>(
    'confluence',
  );
  const [activeUploadOption, setActiveUploadOption] = useState<
    'update' | 'create'
  >('update');
  const mockContent = `<h1>This is a second test page</h1><p>This is a test page with py</p><img src="https://picsum.photos/200/300" alt="Example Image" />`;

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
      formData.append('title', 'Test Page Py');
      formData.append(
        'content',
        `<h1>This is a second test page</h1><p>This is a test page with py</p><img src="https://picsum.photos/200/300" alt="Example Image" />`,
      );

      const response = await fetch('http://localhost:8000/postonconfluence', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Page created successfully:', result);
      } else {
        const errorText = await response.text();
        console.error('Failed to create page:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error while creating page:', error);
    }
  };

  const handleUpdateOnConfluence = async () => {
    if (!confluencePageId || confluencePageId === '') {
      console.error('Parent page ID is not set');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', 'Update page test');
      formData.append('content', mockContent);
      formData.append('page_id', confluencePageId);

      const response = await fetch('http://localhost:8000/updateonconfluence', {
        method: 'PUT',
        body: formData,
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Page updated successfully:', result);
      } else {
        const errorText = await response.text();
        console.error('Failed to update page:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error while updating page:', error);
    }
  };

  const handlePageIdChange = (pageId: string) => {
    if (pageId) {
      setConfluencePageId(pageId);
    } else {
      setConfluencePageId('');
    }
  };

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
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Left Side */}
            {activeSideTab === 'confluence' && (
              <ConfluenceSideTab
                activeUploadOption={activeUploadOption}
                setActiveUploadOption={setActiveUploadOption}
                handlePageIdChange={handlePageIdChange}
                handleUploadToConfluence={handleUploadToConfluence}
                confluencePageId={confluencePageId}
                mockContent={mockContent}
              />
            )}
            {/* Right Side */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Page Preview
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: 2,
                  backgroundColor: '#fff',
                  overflowY: 'auto',
                  maxHeight: '80vh',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: mockContent }}
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
    </Box>
  );
};

export default ExportTab;
