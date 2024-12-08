import React, { useState } from 'react';

type Result = {
    file_name: string;
    transcription: string;
    summary: string;
};

const VideoUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [transcription, setTranscription] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sections, setSections] = useState<string[]>(['']);
    const [confluencePageId, setConfluencePageId] = useState('');

    const handleGetSummary = async () => {
        if (!file) return; // Ensure file is uploaded
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
            setFileName(result.file_name);
            setTranscription(result.transcription);
            setSummary(result.summary);
        } catch (error) {
            console.error("Error uploading video:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCreateNewOnConfluence = async () => {
        if (!confluencePageId || confluencePageId === '') {
            console.error("Parent page ID is not set");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('parent_id', confluencePageId);
            formData.append('title', "Test Page Py");
            formData.append('content', `<h1>This is a second test page</h1><p>This is a test page with py</p><img src="https://picsum.photos/200/300" alt="Example Image" />`);

            const response = await fetch("http://localhost:8000/postonconfluence", {
                method: "POST",
                body: formData,
                mode: "cors",
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

    const handleUpdateOnConfluence = async () => {
        if (!confluencePageId || confluencePageId === '') {
            console.error("Parent page ID is not set");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", "Update page test");
            formData.append("content", "<h1>This is a update test page</h1><p>This is an updated test page with py</p><p>Test Nr 4</p><img src=\"https://picsum.photos/200/300\" alt=\"Example Image\" />");
            formData.append("page_id", confluencePageId);

            const response = await fetch("http://localhost:8000/updateonconfluence", {
                method: "PUT",
                body: formData,
                mode: "cors",
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Page updated successfully:", result);
            } else {
                const errorText = await response.text();
                console.error("Failed to update page:", response.status, errorText);
            }
        } catch (error) {
            console.error("Error while updating page:", error);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
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
            console.log("Page ID:", pageId);
            setConfluencePageId(pageId);
        }
    }

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
            <br/>
            <button onClick={handleGetSummary} disabled={!file}>Get Summary</button>
            <div>
                <h3>Subtitle File Name:</h3>
                <p>{fileName}</p>
                {isLoading ? (
                    <div className="spinner">Loading...</div>
                ) : (
                    <div>
                        <h3>Summary:</h3>
                        <p>{summary}</p>
                        <div>
                            <input type="text"
                                   value={confluencePageId}
                                   placeholder="Confluence Page ID"
                                   onChange={(e) => handlePageIdChange(e.target.value)}/>
                            <br/>
                            <button onClick={() => handleUpdateOnConfluence()}>Update on given page</button>
                            <br/>
                            <button onClick={() => handleCreateNewOnConfluence()}>Create new under given parent id</button>
                        </div>

                        <h3>Transcription:</h3>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{transcription}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoUploader;