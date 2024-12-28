import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import logo from '../logo.svg';

const AppHeader = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Box component="img" src={logo} alt="Logo" sx={{ height: 40 }} />
                </Typography>

                {/* Profile Icon */}
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="account"
                    onClick={() => alert('Profile menu clicked')}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
