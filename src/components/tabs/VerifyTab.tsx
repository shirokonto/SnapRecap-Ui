import React from 'react';

const VerifyTab = ({
  transcription,
  summary,
}: {
  transcription: string;
  summary: string;
}) => {
  return (
    <div>
      <h3>Transcription:</h3>
      <pre>{transcription}</pre>
      <h3>Summary:</h3>
      <p>{summary}</p>
      <h3>Screenshots:</h3>
      <p>Add screenshots on the right?</p>
    </div>
  );
};

export default VerifyTab;
