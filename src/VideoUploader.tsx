import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TitleBox from 'components/boxes/TitleBox';
import VideoBox from 'components/boxes/VideoBox';
import SectionBox from 'components/boxes/SectionBox';
import { Stack } from '@mui/material';

type Result = {
  file_name: string;
  transcription: string;
  summary: string;
};

const VideoUploader = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<string[]>(['']);
  const [confluencePageId, setConfluencePageId] = useState('');

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleGetSummary = async () => {
    if (!videoFile) return; // Ensure video file is uploaded
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('sections', JSON.stringify(sections));

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
      const result: Result = await response.json();
      setFileName(result.file_name);
      setTranscription(result.transcription);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsLoading(false);
    }
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

  const addSection = () => {
    setSections([...sections, '']);
  };

  const deleteSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handlePageIdChange = (pageId: string) => {
    if (pageId) {
      console.log('Page ID:', pageId);
      setConfluencePageId(pageId);
    }
  };

  // TODO Tabs : Upload, Verify, Export
  // Component: Upload

  return (
    <div>
      <h1>Summarize Video</h1>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upload" value="1" />
              <Tab label="Verify" value="2" />
              <Tab label="Export" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Upload with title, video and sections</TabPanel>
          <TabPanel value="2">Verify transcript and summary</TabPanel>
          <TabPanel value="3">Export to Confluence or download</TabPanel>
        </TabContext>
      </Box>

      {/* TODO move to UploadTab */}
      <Stack direction="column" spacing={2} alignItems="center">
        <h3>Subtitle File Name:</h3>
        <p>{fileName}</p>
        <TitleBox label="Title:" />
        <VideoBox onChange={handleFileUpload} />
        <SectionBox
          sections={sections}
          onSectionChange={handleSectionChange}
          onAddSection={addSection}
          onDeleteSection={deleteSection}
        />
      </Stack>

      {/* TODO isLoading? then show loading icon instead of GenerateSummary */}
      <button
        onClick={handleGetSummary}
        disabled={!videoFile}
        className={`px-4 py-2 rounded-md text-white ${videoFile ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Generate Summary
      </button>

      {/* TODO move to VerifyTab */}
      <div>
        <h3>Transcription:</h3>
        <pre>{transcription}</pre>

        <h3>Summary:</h3>
        <p>{summary}</p>

        {/* TODO move to ExportTab */}
        <div>
          <input
            type="text"
            value={confluencePageId}
            placeholder="Confluence Page ID"
            onChange={(e) => handlePageIdChange(e.target.value)}
          />
          <div>
            <button onClick={handleUpdateOnConfluence}>
              Update on Given Page
            </button>
            <button onClick={handleCreateNewOnConfluence}>
              Create New Under Parent ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;
