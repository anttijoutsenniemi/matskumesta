import React, { useEffect } from 'react';
import useStore from '../stores/useStore';
import { Button, Typography } from '@mui/material';
import Modal from '../components/Modal';
import ProductGrid, { Product } from '../components/ProductGrid';
import naama from './../assets/naama.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { fetchSellerProducts } from '../components/ApiFetches';

const HomePage: React.FC = () => {
  const { username, modalOpen, setModalOpen, setSelectedProduct, selectedProduct, sellerFinalProducts, setSellerFinalProducts } = useStore();
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  useEffect(() => { //we fetch and fill products if found on app start
    const fetchData = async () => {
      if (!sellerFinalProducts) {
        try {
          let token2 : string = token || 'juu';
          let newProducts = await fetchSellerProducts(username, logout, token2);
          if(newProducts){ //should return null if user has no products
            let products = newProducts.products;
            setSellerFinalProducts(products);
          }
          else{
            setSellerFinalProducts(null);
          }
        } catch (error) {
          console.error('Error fetching seller products:', error);
        }
      }
    };
    fetchData();
  }, []);

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
    // let newProduct : Product = products[0];
    // for(let i = 0; i < products.length; i++){
    //   if(products[i].id === id){
    //     newProduct = products[i];
    //     break;
    //   }
    // }
    if(sellerFinalProducts){
      let newProduct : Product = sellerFinalProducts[0];
      for(let i = 0; i < sellerFinalProducts.length; i++){
        if(sellerFinalProducts[i].id === id){
          newProduct = sellerFinalProducts[i];
          break;
        }
      }
      setSelectedProduct(newProduct);
      openModal();
    }
  };

  const addProducts = () => {
    navigate('/addproducts');
  }

  return <div>
          <Typography variant='h4'>Myyjän: {username} mesta</Typography>
          <Typography variant='h5' sx={{marginTop: '20px', marginBottom: '20px'}}>Lisätyt matskuni</Typography>
            <div className='matskut-container' style={{marginTop: '10px', marginBottom: '10px'}}>
              {
                (sellerFinalProducts)
                ? <>
                    <ProductGrid products={sellerFinalProducts} onProductClick={handleProductClick}/>
                    <Modal title='Matskun tiedot' product={selectedProduct} isOpen={modalOpen} onClose={closeModal}/>
                  </>
                : <>
                    <Typography variant='subtitle1' sx={{marginBottom: '10px'}}>Et ole vielä lisännyt matskuja myyntiin, alla olevasta napista pääset helposti lisäämään tuotteita tekoälyn avulla!</Typography>
                  </>
              }
              
            </div>
          <Button variant='contained' color='primary' onClick={addProducts}>Lisää matskuja</Button>
         </div>;
};

export default HomePage;
