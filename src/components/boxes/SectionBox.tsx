import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

interface SectionsBoxProps {
  sections: string[];
  onSectionChange: (index: number, value: string) => void;
  onAddSection: () => void;
  onDeleteSection: (index: number) => void;
  setTestingSections: Dispatch<SetStateAction<string[]>>;
}

const SectionsBox = ({
  sections,
  onSectionChange,
  onAddSection,
  onDeleteSection,
  setTestingSections,
}: SectionsBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9F9',
        padding: '16px',
        borderRadius: '8px',
        gap: 1,
        color: '#555555',
        width: '100%',
      }}
    >
      {/* Testing Button to prefill sections */}
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
      <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
        Sections:
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: '#555555', fontWeight: 'light' }}
      >
        Define the title for each section you have defined.
      </Typography>

      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            width: '100%',
          }}
        >
          <TextField
            variant="outlined"
            value={section}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onSectionChange(index, e.target.value);
            }}
            size="small"
            placeholder={`Section ${index + 1}`}
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
          backgroundColor: 'primary',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        <Typography sx={{ color: 'white', fontSize: '17px' }}>Add</Typography>
      </Button>
    </Box>
  );
};

export default SectionsBox;
