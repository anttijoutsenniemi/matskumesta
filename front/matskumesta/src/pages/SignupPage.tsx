// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Username:', username, 'Description:', description, 'Email:', email);
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
      </Box>
    </Box>
  );
};

export default SignUpPage;
