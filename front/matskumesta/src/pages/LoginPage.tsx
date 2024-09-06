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

  const MAX_EMAIL_LENGTH = 80;
  const MAX_PASSWORD_LENGTH = 50;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();

    // Perform validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/; // Minimum 8 characters, includes uppercase, lowercase, number, and special character

    if (!emailPattern.test(trimmedEmail)) {
      alert('Sähköpostiosoite ei ole kelvollinen');
      return;
    }
    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      alert(`Sähköposti ei voi olla pidempi kuin ${MAX_EMAIL_LENGTH} merkkiä`);
      return;
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
      alert(`Salasana ei voi olla pidempi kuin ${MAX_PASSWORD_LENGTH} merkkiä`);
      return;
    }
    if (!passwordPattern.test(trimmedPassword)) {
      alert('Salasanan on oltava vähintään 8 merkkiä ja sisällettävä isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä.');
      return;
    }

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
