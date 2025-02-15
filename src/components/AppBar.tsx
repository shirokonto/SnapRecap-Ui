import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../snaprecaplogo.svg';

const AppHeader = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" flexGrow={1}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            height={40}
            sx={{ backgroundColor: '#d7d7ff', borderRadius: '20%' }}
          />
        </Typography>

        {/* Info Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account"
          onClick={() =>
            alert(
              'Here the info should appear what is used in the back (e.g. whisper)',
            )
          }
        >
          <InfoIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
