import React, { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const LandingPage: React.FC = () => {
    const { token } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
      if(token){
        navigate('./home');
      }
    }, []); 

    const goToSignup = () => {
        navigate('./signup');
    }
    const goToLogin = () => {
        navigate('./login');
    }
  return <div>
  <Typography variant="h4" gutterBottom>
    Tervetuloa Matskumestaan, täällä materiaalit liikkuvat helposti.
  </Typography>
  <Typography variant="body1" gutterBottom>
    Kirjaudu sisään tai luo käyttäjä aloittaaksesi kaupankäynnin.
  </Typography>
  <Box className='button-container'>
    <Button variant="contained" color="primary" onClick={()=> goToLogin()}>
      Kirjaudu sisään
    </Button>
    <Button variant="outlined" color="secondary" onClick={()=> goToSignup()}>
      Rekisteröidy
    </Button>
  </Box>
</div>
};

export default LandingPage;