import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/TMBA Logo 2020 white transparent.png';

function Header({ isLoggedIn, user, onLogout, showSavedPredictions, setShowSavedPredictions }) {
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Extract the part of the user's email before the '@' symbol
  const userName = user ? user.split('@')[0] : '';

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt="Company Logo" style={{ height: 48, marginRight: 16 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TMBA Sales Estimation Prediction
        </Typography>
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
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>About</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Help</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
