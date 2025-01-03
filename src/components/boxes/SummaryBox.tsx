import { TranscriptionChunk } from 'src/types/transcription';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

const SummaryBox = ({
  summary,
  sections,
}: {
  summary: string;
  sections: string[];
}) => {
  // TODO sections should still be used. if no summary is available show palceholder "No summary available"
  const [sectionSummaries, setSectionSummaries] = useState<
    { section: string; summary: string }[]
  >([]);
  const [selectedSection, setSelectedSection] = useState('');
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const parseSummary = () => {
      const regex = /Section: (.*?)\nSummary: (.*?)(?=Section:|$)/gs;
      const matches = Array.from(summary.matchAll(regex));
      const parsed = matches.map((match) => ({
        section: match[1].trim(),
        summary: match[2].trim(),
      }));
      setSectionSummaries(parsed);
    };

    parseSummary();
  }, [summary]);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as string;
    setSelectedSection(selected);

    // Scroll to the corresponding list item
    const index = sectionSummaries.findIndex(
      (item) => item.section === selected,
    );
    if (index !== -1 && listRefs.current[index]) {
      listRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: '#F8F9F9',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
          Summary:
        </Typography>
        <FormControl
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            marginLeft: '16px',
            flex: 1,
          }}
        >
          <InputLabel id="demo-simple-select-label">Jump to</InputLabel>
          <Select
            value={selectedSection}
            label="Jump to Section"
            onChange={handleChange}
          >
            {sectionSummaries.map((item, index) => (
              <MenuItem key={index} value={item.section}>
                {item.section}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {sectionSummaries.map((item, index) => (
          <li key={index}>
            <ul>
              <ListSubheader>{`${item.section}`}</ListSubheader>
              <ListItem
                ref={(el: HTMLLIElement | null) =>
                  (listRefs.current[index] = el)
                } // Assign ref for scrolling
                sx={{
                  backgroundColor:
                    item.section === selectedSection ? '#f0f0f0' : 'inherit', // Highlight selected item
                  borderRadius: '8px',
                }}
              >
                <ListItemText primary={item.summary} />
              </ListItem>
            </ul>
          </li>
        ))}
      </List>
    </Stack>
  );
};

export default SummaryBox;
