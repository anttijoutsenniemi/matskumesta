import React, { useState, useEffect } from 'react';
import useStore from '../stores/useStore';
import ProductGrid, { Product } from '../components/ProductGrid';
import EditableModal from '../components/EditableModal';

import { Button, Typography, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ConfirmProductsPage: React.FC = () => {
  const { username, modalOpen, setModalOpen, setSelectedProduct, selectedProduct, manyFilledProducts, setManyFilledProducts } = useStore();
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => setModalOpen(false);

  const backToAddProductsPage = () => {
    navigate('/addproducts');
  }

  const handleProductClick = (id: string | number) => {
    let newProduct : Product = manyFilledProducts[0];
    for(let i = 0; i < manyFilledProducts.length; i++){
      if(manyFilledProducts[i].id === id){
        newProduct = manyFilledProducts[i];
        break;
      }
    }
    setSelectedProduct(newProduct);
    openModal();
  };

  const confirmProducts = () => {

  }

  return  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Header Container */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                padding: '16px 0',
              }}
            >
              {/* Back Arrow and Text */}
              <IconButton onClick={backToAddProductsPage}>
                <ArrowBackIosIcon />
              
              <Typography variant="body1">Takaisin</Typography>
              </IconButton>
            </div>
            <Typography variant='h4'>Tulkitsin kuvastasi seuraavat tuotetiedot: </Typography>
            <Typography variant='body1' sx={{marginBottom: '10px', marginTop: '10px'}}>Klikkaa tuotekortteja muokkaaksesi</Typography>
              <ProductGrid products={manyFilledProducts} onProductClick={handleProductClick}/>
              <EditableModal product={selectedProduct} isOpen={modalOpen} onClose={closeModal}/>
              <Button variant="contained" color="primary" fullWidth onClick={confirmProducts}>
                Vahvista & lisää tuotteet valikoimaasi
              </Button>
        </div>
};

export default ConfirmProductsPage;