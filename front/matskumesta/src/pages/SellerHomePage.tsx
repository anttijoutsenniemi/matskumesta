import React, { useEffect } from 'react';
import useStore from '../stores/useStore';
import { Button, Typography, useTheme } from '@mui/material';
import Modal from '../components/Modal';
import ProductGrid, { Product } from '../components/ProductGrid';
import naama from './../assets/naama.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { fetchSellerProducts } from '../components/ApiFetches';
import TwoColorBoxes from '../components/ColorBoxes';

const HomePage: React.FC = () => {
  const { username, modalOpen, setModalOpen, setSelectedProduct, selectedProduct, sellerFinalProducts, setSellerFinalProducts } = useStore();
  const navigate = useNavigate();
  const { logout, token } = useAuth();
  const theme = useTheme();

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

    if(sellerFinalProducts){
      let identifier : number = Number(id);
      let newProduct : Product = sellerFinalProducts[identifier];

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
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
              <TwoColorBoxes
                box1Color={theme.palette.secondary.main}
                box1Description='Tuotteesta on tehty varaus'
                box2Color={theme.palette.tertiary.main}
                box2Description='Varaamaton tuote'
              />
            </div>
          <Button variant='contained' color='primary' onClick={addProducts}>Lisää matskuja myyntiin</Button>
         </div>;
};

export default HomePage;
