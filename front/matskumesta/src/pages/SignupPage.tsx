import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { signupSelf, loginSelf } from '../components/ApiFetches';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();

  // Define maximum length constants
  const MAX_USERNAME_LENGTH = 20;
  const MAX_DESCRIPTION_LENGTH = 100;
  const MAX_EMAIL_LENGTH = 80;
  const MAX_PASSWORD_LENGTH = 50;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim leading and trailing whitespace
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedDescription = description.trim(); // Only trims spaces at the start and end
    const trimmedPassword = password.trim();

    // Perform validation
    const usernamePattern = /^[a-zA-Z0-9_]+$/; // Alphanumeric usernames with underscores allowed
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/; // Minimum 8 characters, includes uppercase, lowercase, number, and special character
    
    if (!usernamePattern.test(trimmedUsername)) {
      alert('Käyttäjänimi ei ole kelvollinen. Vain kirjaimet, numerot ja alaviivat ovat sallittuja.');
      return;
    }
    if (trimmedUsername.length > MAX_USERNAME_LENGTH) {
      alert(`Käyttäjänimi ei voi olla pidempi kuin ${MAX_USERNAME_LENGTH} merkkiä`);
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      alert('Sähköpostiosoite ei ole kelvollinen');
      return;
    }
    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      alert(`Sähköposti ei voi olla pidempi kuin ${MAX_EMAIL_LENGTH} merkkiä`);
      return;
    }
    if (trimmedDescription.length > MAX_DESCRIPTION_LENGTH) {
      alert(`Kuvaus ei voi olla pidempi kuin ${MAX_DESCRIPTION_LENGTH} merkkiä`);
      return;
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
      alert(`Salasana ei voi olla pidempi kuin ${MAX_PASSWORD_LENGTH} merkkiä`);
      return;
    }
    if (password !== checkPassword) {
      alert('Salasanojen on täsmättävä')
      return;
    }
    if (!passwordPattern.test(trimmedPassword)) {
      alert('Salasanan on oltava vähintään 8 merkkiä ja sisällettävä isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä.');
      return;
    }

    try {
      let reqBody : object = { username: trimmedUsername, description : trimmedDescription, email : trimmedEmail, password : trimmedPassword};
      const response = await signupSelf(reqBody);

      if(response.message === 'User already exists'){
        throw new Error('Username already exists');
      }
      else if(response.errors){
        throw new Error('Signup failed, check your inputs and try again');
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
          label="Salasana uudestaan"
          type="password"
          fullWidth
          margin="normal"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
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
