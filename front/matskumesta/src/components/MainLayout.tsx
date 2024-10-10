import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, CssBaseline, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../stores/useStore';
import { reuleaux } from 'ldrs';
import type {} from 'ldrs';
reuleaux.register();

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
  const { drawerOpen, setDrawerOpen, isSeller, setIsSeller, loadingMessage, loading, errorMessage} = useStore();
  const location = useLocation();

  // Define subtitles for each route
  const getSubtitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Tervetuloa';
      case '/login':
        return 'Kirjaudu';
      case '/signup':
        return 'Rekisteröidy';
      case '/home':
        return 'Etusivu';
      default:
        return '';
    }
  };

  const subtitle = getSubtitle(location.pathname);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const changeSellerStatus = (seller : boolean) => {
    setIsSeller(seller);
  }

  return (
    <>
      <CssBaseline />
      <Header>
        <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Matskumesta
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
          {
            (isSeller)
            ? <Button variant='contained' color='primary' onClick={()=> changeSellerStatus(false)}>Vaihda ostajatilaan</Button>
            : <Button variant='contained' color='primary' onClick={()=> changeSellerStatus(true)}>Vaihda myyjätilaan</Button>
          }
          <Link to={'/home'}><p>Siirry etusivulle</p></Link>
          <Link to={'/login'}><p>Siirry kirjautumissivulle</p></Link>
          <Link to={'/signup'}><p>Siirry rekisteröitymissivulle</p></Link>

          
        </Box>
      </Drawer>
      <div className='app-background'>
      <MainContainer>
        <div className='landing-page-container'>
          
        {children} {/*Here is pasted the page user is currently on*/}
        
        {(loading && 
          <div className='loading-container' style={{marginTop: '20px'}}>
          <Typography variant='body1' sx={{marginBottom: '10px'}}>{loadingMessage}</Typography>
          <l-reuleaux size={60} color={'#2196f3'} speed={3}></l-reuleaux>
        </div>
        )}
        {(errorMessage) &&
          <Typography variant='body1' sx={{color: 'red', marginTop: '20px'}}>{errorMessage}</Typography>
        }
        
        </div>
      </MainContainer>
      </div>
    </>
  );
};

export default MainLayout;
