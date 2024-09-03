import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, CssBaseline, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../stores/useStore';

const MainContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  margin: '0 auto',
  width: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    maxWidth: '80%', // Adjust width for desktop
  },
}));

const Header = styled(AppBar)({
  position: 'static',
});

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { drawerOpen, setDrawerOpen } = useStore();
  const location = useLocation();

  // Define subtitles for each route
  const getSubtitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/test':
        return 'Testisivuaaa';
      case '/contact':
        return 'Contact Us';
      default:
        return '';
    }
  };

  const subtitle = getSubtitle(location.pathname);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <CssBaseline />
      <Header>
        <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Main Title
          </Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginLeft: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Header>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: 5 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {/* Drawer content goes here */}
          <Link to={'/'}><p>Go to homepage</p></Link>
          <Link to={'/test'}><p>Go to test page</p></Link>
        </Box>
      </Drawer>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  );
};

export default MainLayout;
