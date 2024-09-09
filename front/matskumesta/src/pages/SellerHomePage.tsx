import React from 'react';
import useStore from '../stores/useStore';
import { Button, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const { username } = useStore();
  return <div>
          <Typography variant='h4'>Myyjän: {username} mesta</Typography>
          <Typography variant='h5' sx={{marginTop: '10px', marginBottom: '10px'}}>Lisätyt matskuni</Typography>
          <Button variant='contained' color='primary'>Lisää matskuja</Button>
         </div>;
};

export default HomePage;
