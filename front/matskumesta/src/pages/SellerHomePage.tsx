import React from 'react';
import useStore from '../stores/useStore';
import { Button, Typography } from '@mui/material';
import Modal from '../components/Modal';
import ProductGrid, { Product } from '../components/ProductGrid';
import naama from './../assets/naama.png';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { username, modalOpen, setModalOpen, setSelectedProduct, selectedProduct } = useStore();
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => setModalOpen(false);

  const products: Product[] = [ //dummy array for testing
    {
      id: 1,
      title: 'Product 1',
      description: 'A high-quality green product.',
      image: 'path/to/image1.jpg',
      color: 'green',
      amount: '50 units',
      weight: '1.5 kg',
      quality: 'High',
      location: 'Warehouse A',
      packaging: 'Boxed',
      availability: 'In Stock',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'A vibrant yellow product.',
      image: 'path/to/image2.jpg',
      color: 'yellow',
      amount: '30 units',
      weight: '1.2 kg',
      quality: 'Medium',
      location: 'Warehouse B',
      packaging: 'Wrapped',
      availability: 'Out of Stock',
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'A sturdy green product.',
      image: 'path/to/image3.jpg',
      color: 'green',
      amount: '40 units',
      weight: '2.0 kg',
      quality: 'Premium',
      location: 'Warehouse C',
      packaging: 'Crated',
      availability: 'Limited Availability',
    },
  ];
  const handleProductClick = (id: string | number) => {
    let newProduct : Product = products[0];
    for(let i = 0; i < products.length; i++){
      if(products[i].id === id){
        newProduct = products[i];
        break;
      }
    }
    setSelectedProduct(newProduct);
    openModal();
  };
  const addProducts = () => {
    navigate('/addproducts');
  }

  return <div>
          <Typography variant='h4'>Myyjän: {username} mesta</Typography>
          <Typography variant='h5' sx={{marginTop: '10px', marginBottom: '10px'}}>Lisätyt matskuni</Typography>
            <div className='matskut-container'>
              <ProductGrid products={products} onProductClick={handleProductClick}/>
              <Modal title='Matskun tiedot' product={selectedProduct} isOpen={modalOpen} onClose={closeModal}/>
            </div>
          <Button variant='contained' color='primary' onClick={addProducts}>Lisää matskuja</Button>
         </div>;
};

export default HomePage;
