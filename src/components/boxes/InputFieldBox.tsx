import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface InputFieldBoxProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'number';
  value?: string | undefined;
  onTextInput?: (pageId: string) => void;
}

const InputFieldBox = ({
  label,
  placeholder,
  type = 'text',
  value = type === 'number' ? undefined : '',
  onTextInput,
}: InputFieldBoxProps) => {
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
        type={type}
        label={placeholder ?? 'Enter title'}
        value={value}
        helperText={
          type === 'number'
            ? 'Edit the page on Confluence to find the Page ID'
            : ''
        }
        required={true}
        onChange={(e) => onTextInput && onTextInput(e.target.value)}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
          },
          marginLeft: '16px',
          flex: 1,
        }}
      />
    </Box>
  );
};

export default InputFieldBox;
