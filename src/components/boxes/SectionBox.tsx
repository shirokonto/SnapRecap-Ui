import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SummarySwitch from 'components/common/SummarySwitch';

interface SectionsBoxProps {
  sections: string[];
  summarizeWithSections: boolean;
  setSummarizeWithSections: Dispatch<SetStateAction<boolean>>;
  onSectionChange: (index: number, value: string) => void;
  onAddSection: () => void;
  onDeleteSection: (index: number) => void;
  setTestingSections: Dispatch<SetStateAction<string[]>>;
}

const SectionsBox = ({
  sections,
  summarizeWithSections,
  setSummarizeWithSections,
  onSectionChange,
  onAddSection,
  onDeleteSection,
  setTestingSections,
}: SectionsBoxProps) => {
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSummarizeWithSections(event.target.checked);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-between"
      padding="16px"
      gap={1}
      width="100%"
      sx={{
        backgroundColor: '#F8F9F9',
        borderRadius: '8px',
        color: '#555555',
      }}
    >
      <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
        Summarization Type:
      </Typography>
      <SummarySwitch
        isChecked={summarizeWithSections}
        onChange={handleSwitchChange}
      />
      {summarizeWithSections && (
        <>
          <Typography
            variant="h6"
            sx={{ color: '#555555', fontWeight: 'bold' }}
          >
            Sections:
          </Typography>
          {/* TODO remove testing Button to prefill sections */}
          <Button
            onClick={() =>
              setTestingSections([
                'Introduction',
                'What is Jenkins?',
                'How does Jenkins work?',
                'In conclusion',
              ])
            }
            sx={{
              backgroundColor: '#007BFF',
              color: 'white',
              textTransform: 'none',
              marginBottom: '16px',
            }}
          >
            Testing
          </Button>
          <Typography variant="body1" color="#555555" fontWeight="light">
            Add the title for each section that should be summarized.
          </Typography>

          {sections.map((section, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              marginBottom={2}
              width="100%"
            >
              <TextField
                variant="outlined"
                value={section}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onSectionChange(index, e.target.value);
                }}
                size="small"
                placeholder={`Section title ${index + 1}`}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  marginLeft: '16px',
                  flex: 1,
                }}
              />
              <Button
                onClick={() => onDeleteSection(index)}
                sx={{
                  display: 'flex',
                  textTransform: 'none', // disable all caps
                  alignItems: 'center',
                  padding: '8px 20px',
                  backgroundColor: '#EE6061',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ color: 'white', fontSize: '17px' }}>
                  Delete
                </Typography>
              </Button>
            </Box>
          ))}

          <Button
            onClick={onAddSection}
            sx={{
              display: 'flex',
              textTransform: 'none',
              alignItems: 'center',
              padding: '8px 20px',
              marginLeft: '16px',
              backgroundColor: '#292D8D',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ color: 'white', fontSize: '17px' }}>
              Add
            </Typography>
          </Button>
        </>
      )}
    </Box>
  );
};

export default SectionsBox;
