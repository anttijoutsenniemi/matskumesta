import React from 'react';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';

const BuyerHomePage: React.FC = () => {
  const { username } = useStore();
  return <div><Typography variant='h4'>Ostajan: {username} mesta</Typography></div>;
};

export default BuyerHomePage;
