import React from 'react';
import { Box } from '@mui/material';
import ImageBox from 'components/boxes/ImageBox';

const ScreenshotSideTab = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <h3>Screenshots:</h3>
        <p>
          Choose screenshots on the right, will be presented in export to drag
          them.
        </p>
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
        <ImageBox videoFile={undefined} />
      </Box>
    </Box>
  );
};

export default ScreenshotSideTab;
