import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  AddTaskOutlined,
  CancelOutlined,
  ModeEdit,
} from '@mui/icons-material';

interface SummaryBoxProps {
  summary: string;
  sections: string[];
  onEdit: (
    index: number,
    content: { section: string; summary: string },
  ) => void;
  onAddSection: (index: number, section: string) => void;
}

const SummaryBox = ({
  summary,
  sections,
  onEdit,
  onAddSection,
}: SummaryBoxProps) => {
  // TODO sections should still be used. if no summary is available show placeholder "No summary available"
  const [sectionSummaries, setSectionSummaries] = useState<
    { section: string; summary: string }[]
  >([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newSection, setNewSection] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [addIndex, setAddIndex] = useState<number | undefined>(undefined);
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

  const handleEditClick = (index: number) => {
    onEdit(index, sectionSummaries[index]);
  };

  const handleAddClick = (index: number) => {
    setIsAdding(true);
    setAddIndex(index);
    setNewSection('');
    setNewSummary('');
  };

  const handleAddConfirm = () => {
    if (newSection.trim() && addIndex !== undefined) {
      onAddSection(addIndex + 1, newSection.trim());
      setIsAdding(false);
    }
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setNewSection('');
    setNewSummary('');
  };

  const handleOutsideClick = () => {
    if (!newSection.trim()) {
      setIsAdding(false);
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
          <InputLabel>Jump to</InputLabel>
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
              <ListSubheader
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  backgroundColor:
                    item.section === selectedSection ? '#f0f0f0' : '#fffff', // Highlight selected item
                }}
              >
                {`${item.section}`}
                <IconButton
                  onClick={() => handleEditClick(index)}
                  size="medium"
                >
                  <ModeEdit fontSize="medium" />
                </IconButton>
              </ListSubheader>
              <ListItem
                ref={(el: HTMLLIElement | null) =>
                  (listRefs.current[index] = el)
                } // Assign ref for scrolling
                sx={{
                  backgroundColor:
                    item.section === selectedSection ? '#f0f0f0' : 'inherit',
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <ListItemText primary={item.summary} />
              </ListItem>
              {isAdding && addIndex === index && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#D6E6FD',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="New Section Title"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    onBlur={handleOutsideClick}
                    autoFocus={true}
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                      },
                      marginLeft: '8px',
                      flex: 1,
                    }}
                  />
                  <Box
                    gap={1}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <IconButton
                      onClick={handleAddConfirm}
                      size="medium"
                      color={'primary'}
                    >
                      <AddTaskOutlined fontSize="medium" />
                    </IconButton>
                    <IconButton
                      onClick={handleAddCancel}
                      size="medium"
                      color={'error'}
                    >
                      <CancelOutlined fontSize="medium" />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </ul>
            {!isAdding && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F8F9F9',
                }}
              >
                <IconButton onClick={() => handleAddClick(index)} size="medium">
                  <AddCircleOutlineOutlined fontSize="medium" />
                </IconButton>
              </Box>
            )}
          </li>
        ))}
      </List>
    </Stack>
  );
};

export default SummaryBox;
