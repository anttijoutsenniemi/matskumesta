import React, { useState, useEffect } from 'react';
import useStore from '../stores/useStore';
import { Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ConfirmProductsPage: React.FC = () => {
  const { username, filledProduct, setFilledProduct } = useStore();

  const test = () => {
    console.log(filledProduct);
  }

  return <div>
            <Typography variant='h4'>Confirm products: </Typography>
            <Button variant='outlined' onClick={test}>Test</Button>
            {filledProduct ? (
            <Typography variant="h4">Product title: {filledProduct.description}</Typography>
            ) : (
            <Typography variant="h4">No product data available</Typography>
            )}
        </div>
};

export default ConfirmProductsPage;