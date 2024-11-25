import React, { useState } from 'react';

type Result = {
    file_name: string;
    transcription: string;
    summary: string;
};

const VideoUploader = () => {
    const [fileName, setFileName] = useState('');
    const [transcription, setTranscription] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sections, setSections] = useState<string[]>(['']);

    const confluenceBaseUrl = process.env.REACT_APP_CONFLUENCE_BASE_URL;
    const parentPageId = process.env.REACT_APP_CONFLUENCE_PARENT_PAGE_ID;
    const spaceKey = process.env.REACT_APP_CONFLUENCE_SPACEKEY;
    const confluenceToken = process.env.REACT_APP_CONFLUENCE_TOKEN;

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('sections', JSON.stringify(sections));

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/transcribe', {
                method: 'POST',
                body: formData,
                mode: 'cors',
            });
            const result: Result = await response.json();
            console.log("result", result);
            setFileName(result.file_name);
            setTranscription(result.transcription);
            setSummary(result.summary);
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setIsLoading(false);
        }
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

    const handlePublishOnConfluence = async () => {
        try {
            const response = await fetch(`${confluenceBaseUrl}/rest/api/content/${parentPageId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${confluenceToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    version: { number: 2 },
                    title: `Summary for Test`,
                    type: "page",
                    space: {
                        key: spaceKey
                    },
                    body: {
                        storage: {
                            "value": "<h1>Your Content Here</h1>",
                            representation: "storage",
                        },
                    },
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Successfully published to Confluence:", result);
            } else {
                const errorText = await response.text();
                console.error("Failed to publish to Confluence:", response.status, errorText);
            }
        } catch (error) {
            console.error("Error while publishing to Confluence:", error);
        }
    };

    // TODO works with Postman - here CORS error
    const handleCreateNewOnConfluence = async () => {
        try {
            const response = await fetch(`${confluenceBaseUrl}/rest/api/content`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${confluenceToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "page",
                    title: "React Test Page",
                    space: { key: spaceKey },
                    ancestors: [
                        { id: parentPageId }
                    ],
                    body: {
                        storage: {
                            value: `<h1>Welcome</h1><p>This is the content of the new page.</p>`,
                            representation: "storage",
                        },
                    },
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Page created successfully:", result);
            } else {
                const errorText = await response.text();
                console.error("Failed to create page:", response.status, errorText);
            }
        } catch (error) {
            console.error("Error while creating page:", error);
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileUpload} />
            <div>
                <h2>Sections:</h2>
                <div>Define the title for each section that you have defined, use the wording you have used at that time</div>
                <br/>
                {sections.map((section, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <input
                            type="text"
                            value={section}
                            placeholder={`Section ${index + 1}`}
                            onChange={(e) => handleSectionChange(index, e.target.value)}
                            style={{ flex: 1, marginRight: '8px' }}
                        />
                        <button onClick={() => deleteSection(index)}>Delete</button>
                    </div>
                ))}
                <button onClick={addSection}>Add Section</button>
            </div>

            <div>
                <h3>Subtitle File Name:</h3>
                <p>{fileName}</p>
                {isLoading ? (
                    <div className="spinner">Loading...</div>
                ) : (
                    <div>
                        <h3>Summary:</h3>
                        <p>{summary}</p>
                        <button onClick={() => handlePublishOnConfluence()}>Publish</button>
                        <button onClick={() => handleCreateNewOnConfluence()}>Create new</button>

                        <h3>Transcription:</h3>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{transcription}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoUploader;