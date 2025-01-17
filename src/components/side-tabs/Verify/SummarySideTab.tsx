import React, { useState } from 'react';
import { Box } from '@mui/material';
import SummaryBox from 'components/boxes/SummaryBox';

import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface SummarySideTabProps {
  summary: string;
  sections: string[];
  setSummary: (newSummary: string) => void;
}

const SummarySideTab = ({
  summary,
  sections,
  setSummary,
}: SummarySideTabProps) => {
  const [editorContent, setEditorContent] = useState<EditorState>(
    EditorState.createEmpty(),
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [parsedSummaries, setParsedSummaries] = useState(() => {
    const regex = /Section: (.*?)\nSummary: (.*?)(?=Section:|$)/gs;
    return Array.from(summary.matchAll(regex)).map((match) => ({
      section: match[1].trim(),
      summary: match[2].trim(),
    }));
  });

  const handleEdit = (
    index: number,
    content: { section: string; summary: string },
  ) => {
    setEditingIndex(index);
    const contentState = ContentState.createFromText(
      `${content.section}\n${content.summary}`,
    );
    setEditorContent(EditorState.createWithContent(contentState));
  };

  const handleEditorChange = (newEditorContent: EditorState) => {
    setEditorContent(newEditorContent);

    if (editingIndex !== null) {
      const contentText = newEditorContent.getCurrentContent().getPlainText();
      const [section, ...summaryLines] = contentText.split('\n');
      const updatedSummaries = [...parsedSummaries];
      updatedSummaries[editingIndex] = {
        section: section || updatedSummaries[editingIndex].section,
        summary: summaryLines.join('\n') || '',
      };
      setParsedSummaries(updatedSummaries);

      const newSummary = updatedSummaries
        .map(
          ({ section, summary }) => `Section: ${section}\nSummary: ${summary}`,
        )
        .join('\n');
      setSummary(newSummary);
    }
  };

  const handleNewSection = (index: number, newSection: string) => {
    const initialLength = parsedSummaries.length;
    parsedSummaries.splice(index, 0, {
      section: newSection,
      summary: '',
    });

    if (parsedSummaries.length > initialLength) {
      handleEdit(index, {
        section: parsedSummaries[index].section,
        summary: parsedSummaries[index].summary,
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <SummaryBox
          summary={summary}
          sections={sections}
          onEdit={handleEdit}
          onAddSection={handleNewSection}
        />
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
        <Editor
          editorState={editorContent}
          onEditorStateChange={handleEditorChange}
        />
      </Box>
    </Box>
  );
};

export default SummarySideTab;
