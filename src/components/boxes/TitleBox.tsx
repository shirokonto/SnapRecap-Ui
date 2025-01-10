import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface TitleBoxProps {
  label: string;
  placeholder?: string;
  type?: 'number';
  onTextInput?: (pageId: string) => void;
}

const TitleBox = ({ label, placeholder, type, onTextInput }: TitleBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9F9',
        padding: '16px',
        borderRadius: '8px',
        color: '#555555',
        width: '100%',
      }}
    >
      {/* Text on the Left */}
      <Typography variant="h6" sx={{ color: '#555555', fontWeight: 'bold' }}>
        {label}
      </Typography>

      {/* Input Field on the Right */}
      <TextField
        variant="outlined"
        size="small"
        type={type ?? 'text'}
        label={placeholder ?? 'Enter title'}
        onChange={(e) => onTextInput && onTextInput(e.target.value)}
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          marginLeft: '16px',
          flex: 1,
        }}
      />
    </Box>
  );
};

export default TitleBox;
