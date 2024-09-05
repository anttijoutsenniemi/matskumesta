import React from 'react';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const { username } = useStore();
  return <div><Typography variant='h4'>Tervetuloa Matskumestaan myyjä {username}!</Typography></div>;
};

export default HomePage;
