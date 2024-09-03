import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { signupSelf, loginSelf } from '../components/ApiFetches';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let reqBody : object = { username, description, email, password};
      const response = await signupSelf(reqBody);

      if(response.message === 'User already exists'){
        throw new Error('Username already exists');
      }
      else if (!response) {
        throw new Error('Failed to sign up');
      }

      alert('Rekisteröityminen onnistui, kirjaudu sisään uusilla tunnuksillasi');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error);
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
        Rekisteröityminen
      </Typography>
      <Box component="form" onSubmit={handleSignUp} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Käyttäjänimi"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Kuvaus"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <TextField
          label="Sähköposti"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
          Sähköpostisi näytetään vain käyttäjille, joiden kanssa olet hyväksynyt kaupat.
        </Typography>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Rekisteröidy
        </Button>
        <p>Onko sinulla jo käyttäjä? <Link to={'/login'}>Kirjaudu sisään tästä</Link></p>
      </Box>
    </Box>
  );
};

export default SignUpPage;
