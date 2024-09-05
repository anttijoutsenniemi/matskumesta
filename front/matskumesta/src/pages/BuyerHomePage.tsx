import React from 'react';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';

const BuyerHomePage: React.FC = () => {
  const { username } = useStore();
  return <div><Typography variant='h4'>Tervetuloa Matskumestaan ostaja {username}!</Typography></div>;
};

export default BuyerHomePage;
