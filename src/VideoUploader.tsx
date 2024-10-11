import React, { useState } from 'react';

type Result = {
    file_name: string;
    transcription: string;
};
const VideoUploader = () => {
    const [fileName, setFileName] = useState('');
    const [transcription, setTranscription] = useState('');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/transcribe', {
                method: 'POST',
                body: formData,
                mode: 'cors',
            });
            const result : Result = await response.json();
            console.log("result", result);
            setFileName(result.file_name);
            setTranscription(result.transcription);
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileUpload} />
            <div>
                <h3>Subtitle File Name:</h3>
                <p>{fileName}</p>
                <h3>Transcription:</h3>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{transcription}</pre>
            </div>
        </div>
    );
};

export default VideoUploader;
