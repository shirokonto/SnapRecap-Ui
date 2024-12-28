import React, { useState } from 'react';

type ExportTabProps = {
  fileName: string;
  summary: string;
};

const ExportTab = ({ fileName, summary }: ExportTabProps) => {
  const [confluencePageId, setConfluencePageId] = useState('');

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
      console.log('Page ID:', pageId);
      setConfluencePageId(pageId);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={confluencePageId}
        placeholder="Confluence Page ID"
        onChange={(e) => setConfluencePageId(e.target.value)}
      />
      <div>
        <button onClick={handleUpdateOnConfluence}>Update on Given Page</button>
        <button onClick={handleCreateNewOnConfluence}>
          Create New Under Parent ID
        </button>
      </div>
    </div>
  );
};

export default ExportTab;
