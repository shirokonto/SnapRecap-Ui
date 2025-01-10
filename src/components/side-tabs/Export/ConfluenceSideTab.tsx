import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconButton from 'components/common/IconButton';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TitleBox from 'components/boxes/TitleBox';

type ConfluenceSideTabProps = {
  activeUploadOption: 'update' | 'create';
  setActiveUploadOption: Dispatch<SetStateAction<'update' | 'create'>>;
  handlePageIdChange: (pageId: string) => void;
  handleUploadToConfluence: () => {};
  confluencePageId: string;
  mockContent: string;
};

const ConfluenceSideTab = ({
  activeUploadOption,
  setActiveUploadOption,
  handlePageIdChange,
  handleUploadToConfluence,
  confluencePageId,
}: ConfluenceSideTabProps) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <IconButton
            label={'Update on page'}
            icon={PublishedWithChangesOutlinedIcon}
            onClick={() => setActiveUploadOption('update')}
            selected={activeUploadOption === 'update'}
          />
          <IconButton
            label={'Create new child'}
            icon={NoteAddOutlinedIcon}
            onClick={() => setActiveUploadOption('create')}
            selected={activeUploadOption === 'create'}
          />
        </Stack>
        {/* https://mui.com/material-ui/react-text-field/#type-quot-number-quot */}
        <TitleBox
          label="Confluence Page ID:"
          placeholder={'Enter numeric page ID'}
          type="number"
          onTextInput={handlePageIdChange}
        />
        <div>
          Needed: email+pw to login? then get token, base url, spacekey, token
        </div>
        <Button
          onClick={handleUploadToConfluence}
          variant="contained"
          color="primary"
          disabled={!confluencePageId || confluencePageId === ''}
          sx={{
            textTransform: 'none',
            marginTop: 2,
            width: '80%',
            borderRadius: '10px',
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '17px' }}>
            Upload to Confluence
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfluenceSideTab;
