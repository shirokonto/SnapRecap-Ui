import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getInitialSummaryEditorState } from 'utils/SummaryEditorStateUtil';

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
  const initialEditorState = getInitialSummaryEditorState(summary);
  const [editorState, setEditorState] =
    useState<EditorState>(initialEditorState);

  useEffect(() => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(rawContent);
    setSummary(html);
  }, [editorState, setSummary]);

  return (
    <Box
      sx={{
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#F8F9F9',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'list',
            'textAlign',
            'link',
            'history',
          ],
          blockType: {
            inDropdown: false,
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
          },
        }}
        editorStyle={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: '#F1F1F1',
          padding: '16px',
        }}
      />
    </Box>
  );
};

export default SummarySideTab;
