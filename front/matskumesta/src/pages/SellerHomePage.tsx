import React from 'react';
import useStore from '../stores/useStore';
import { Button, Typography } from '@mui/material';
import Modal from '../components/Modal';
import ProductGrid from '../components/ProductGrid';
import naama from './../assets/naama.png';

const HomePage: React.FC = () => {
  const { username, modalOpen, setModalOpen, setSelectedProduct, selectedProduct } = useStore();

  const openModal = (product : any) => {
    setModalOpen(true);
    setSelectedProduct(product);
  }
  const closeModal = () => setModalOpen(false);
  const testProduct = { title: 'Tammilautaa' };
  const products = [
    { id: 1, title: 'Product 1', image: naama, color: 'green' },
    { id: 2, title: 'Product 2', image: 'path/to/image2.jpg', color: 'yellow' },
    { id: 3, title: 'Product 3', image: 'path/to/image3.jpg', color: 'green' },
  ];
  const handleProductClick = (title: string) => {
    console.log('Clicked product:', title);
  };

  return <div>
          <Typography variant='h4'>Myyjän: {username} mesta</Typography>
          <Typography variant='h5' sx={{marginTop: '10px', marginBottom: '10px'}}>Lisätyt matskuni</Typography>
            <div className='matskut-container'>
              <ProductGrid products={products} onProductClick={handleProductClick}/>
              <Modal title='Matskun tiedot' product={selectedProduct} isOpen={modalOpen} onClose={closeModal}/>
            </div>
          <Button variant='contained' color='primary' onClick={() => openModal(testProduct)}>Lisää matskuja</Button>
         </div>;
};

export default HomePage;
