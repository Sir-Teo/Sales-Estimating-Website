// components/Header.js
import React, { useState } from 'react';
import logo from '../assets/TMBA Logo 2020 white transparent.png';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ isLoggedIn, user, onLogout, showSavedPredictions, setShowSavedPredictions, onNavigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const userName = user ? user.split('@')[0] : '';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    onNavigate(page);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box component="img" src={logo} alt="Company Logo" sx={{ height: 48, marginRight: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TMBA Sales Estimation Prediction
        </Typography>
        <Button color="inherit" onClick={() => handleMenuItemClick('main')}>Home</Button>
        {isLoggedIn && user && (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Welcome, {userName}
            </Typography>
            <Button 
              color="inherit" 
              onClick={() => setShowSavedPredictions(!showSavedPredictions)}
            >
              {showSavedPredictions ? 'Hide Saved' : 'Show Saved'}
            </Button>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('about')}>About</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('help')}>Help</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('report')}>Report</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
