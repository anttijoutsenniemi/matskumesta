import React from 'react';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';

const EmptyPage: React.FC = () => {
  const { username } = useStore();
  return <div><Typography variant='h4'>Matskumesta</Typography></div>;
};

export default EmptyPage;