import React, { useState } from 'react';
import { Box, Button, Grid2, Stack, Typography } from '@mui/material';
import TitleBox from 'components/boxes/TitleBox';
import IconButton from 'components/common/IconButton';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
type ExportTabProps = {
  fileName: string;
  summary: string;
};

const ExportTab = ({ fileName, summary }: ExportTabProps) => {
  const [confluencePageId, setConfluencePageId] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<
    'transcript' | 'summary' | 'screenshots' | null
  >('transcript');

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
      formData.append(
        'content',
        '<h1>This is a update test page</h1><p>This is an updated test page with py</p><p>Test Nr 4</p><img src="https://picsum.photos/200/300" alt="Example Image" />',
      );
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
              onClick={() =>
                setActiveSideTab(
                  activeSideTab === 'transcript' ? null : 'transcript',
                )
              }
              selected={activeSideTab === 'transcript'}
            />
            <IconButton
              label="Download PDF"
              icon={FileDownloadOutlinedIcon}
              onClick={() =>
                setActiveSideTab(activeSideTab === 'summary' ? null : 'summary')
              }
              selected={activeSideTab === 'summary'}
            />
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Left Side */}
            <Box sx={{ flex: 1 }}>
              <Stack direction="column" spacing={2} alignItems="center">
                {/* https://mui.com/material-ui/react-text-field/#type-quot-number-quot */}
                <TitleBox
                  label="Confluence Page ID:"
                  placeholder={'Enter numeric page ID'}
                  type="number"
                  onTextInput={handlePageIdChange}
                />
                <div>
                  You can find the page id when you edit the page on confluence
                </div>
                <Button
                  onClick={handleUpdateOnConfluence}
                  variant="contained"
                  color="primary"
                  disabled={!confluencePageId}
                  sx={{
                    textTransform: 'none',
                    marginTop: 2,
                    width: '80%',
                    borderRadius: '10px',
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '17px' }}>
                    Update on Given Page
                  </Typography>
                </Button>
                <Button
                  onClick={handleCreateNewOnConfluence}
                  variant="contained"
                  color="primary"
                  disabled={!confluencePageId || confluencePageId === ''}
                  sx={{
                    textTransform: 'none',
                    marginTop: 2,
                    width: '80%',
                    borderRadius: '10px',
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '17px' }}>
                    Create New Under Parent ID
                  </Typography>
                </Button>
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
              <TitleBox label="Placeholder Document Preview:" />
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={1} />
      </Grid2>
    </Box>
  );
};

export default ExportTab;
