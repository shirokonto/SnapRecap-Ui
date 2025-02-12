import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import IconButton from 'components/common/IconButton';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import InputFieldBox from 'components/boxes/InputFieldBox';

type ConfluenceSideTabProps = {
  activeUploadOption: 'update' | 'create';
  setActiveUploadOption: Dispatch<SetStateAction<'update' | 'create'>>;
  handlePageIdChange: (pageId: string) => void;
  handleUploadToConfluence: () => void;
  confluencePageId: string;
  spaceKey: string;
  setSpaceKey: Dispatch<SetStateAction<string>>;
  apiToken: string;
  setUserApiToken: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
};

const ConfluenceSideTab = ({
  activeUploadOption,
  setActiveUploadOption,
  handlePageIdChange,
  handleUploadToConfluence,
  confluencePageId,
  spaceKey,
  setSpaceKey,
  apiToken,
  setUserApiToken,
  isLoading = false,
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
        <InputFieldBox
          label="Confluence Page ID:"
          placeholder={'Enter numeric page ID'}
          type="number"
          onTextInput={handlePageIdChange}
        />
        <InputFieldBox
          label="Space-Key:"
          placeholder="Type in your matrikel nr"
          value={spaceKey}
          onTextInput={setSpaceKey}
        />
        <InputFieldBox
          label="API Token:"
          placeholder="Your API Token"
          value={apiToken}
          onTextInput={setUserApiToken}
        />
        <Button
          onClick={handleUploadToConfluence}
          variant="contained"
          color="primary"
          disabled={
            !confluencePageId ||
            confluencePageId === '' ||
            !spaceKey ||
            !apiToken ||
            isLoading
          }
          sx={{
            textTransform: 'none',
            marginTop: 2,
            width: '80%',
            borderRadius: '10px',
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Typography sx={{ color: 'white', fontSize: '17px' }}>
              Upload to Confluence
            </Typography>
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfluenceSideTab;
