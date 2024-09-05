import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { signupSelf, loginSelf } from '../components/ApiFetches';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let reqBody : object = { email, password };
      const response = await loginSelf(reqBody);

      if (!response) {
        throw new Error('Failed to log in');
      }
      
      login(response.token, response.username);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Kirjautuminen
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Sähköposti"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Salasana"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Kirjaudu sisään
        </Button>
        <p>Eikö sinulla ole vielä käyttäjää? <Link to={'/signup'}>Rekisteröidy tästä</Link></p>
      </Box>
    </Box>
  );
};

export default LoginPage;
