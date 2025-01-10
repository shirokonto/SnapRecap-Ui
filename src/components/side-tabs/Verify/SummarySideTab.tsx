import React from 'react';
import { Box } from '@mui/material';
import SummaryBox from 'components/boxes/SummaryBox';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface SummarySideTabProps {
  summary: string;
  sections: string[];
}

const SummarySideTab = ({ summary, sections }: SummarySideTabProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <SummaryBox summary={summary} sections={sections} />
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
        <Editor />
      </Box>
    </Box>
  );
};

export default SummarySideTab;
