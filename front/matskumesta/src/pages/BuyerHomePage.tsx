import React, { useEffect } from 'react';
import useStore from '../stores/useStore';
import { Typography, Button, useTheme } from '@mui/material';
import Modal from '../components/Modal';
import ProductGrid, { Product } from '../components/ProductGrid';
import TwoColorBoxes from '../components/ColorBoxes';
import { useAuth } from '../context/authContext';
import { fetchBuyerReservedProducts } from '../components/ApiFetches';
import { useNavigate } from 'react-router-dom';

const BuyerHomePage: React.FC = () => {
  const { username, buyerReservedProducts, setBuyerReservedProducts, modalOpen, setModalOpen, setSelectedProduct, selectedProduct, } = useStore();
  const theme = useTheme();
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { //we fetch and fill products if found on app start
    const fetchData = async () => {
      if (!buyerReservedProducts) {
        try {
          let token2 : string = token || 'juu';
          let newProducts = await fetchBuyerReservedProducts(username, logout, token2);
          if(newProducts){ //should return null if user has no products
            let products = newProducts.products;
            setBuyerReservedProducts(products);
          }
          else{
            setBuyerReservedProducts(null);
          }
        } catch (error) {
          console.error('Error fetching buyer products:', error);
        }
      }
    };
    fetchData();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => setModalOpen(false);

  const handleProductClick = (id: string | number) => {

    if(buyerReservedProducts){
      let identifier : number = Number(id);
      let newProduct : Product = buyerReservedProducts[identifier];

      setSelectedProduct(newProduct);
      openModal();
    }
  };

  const findProducts = () => {
    navigate('/findproducts');
  }

  return <div>
          <Typography variant='h4'>Ostajan: {username} mesta</Typography>
          <Typography variant='h5' sx={{marginTop: '20px', marginBottom: '20px'}}>Varatut matskuni</Typography>
            <div className='matskut-container' style={{marginTop: '10px', marginBottom: '10px'}}>
              {
                (buyerReservedProducts)
                ? <>
                    <ProductGrid products={buyerReservedProducts} onProductClick={handleProductClick}/>
                    <Modal title='Matskun tiedot' product={selectedProduct} isOpen={modalOpen} onClose={closeModal}/>
                  </>
                : <>
                    <Typography variant='subtitle1' sx={{marginBottom: '10px'}}>Et ole vielä varannut matskuja, alla olevasta napista pääset helposti löytämään tarpeisiisi sopivia matskuja tekoälyn avulla!</Typography>
                  </>
              }
              
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
              <TwoColorBoxes
                box1Color={theme.palette.secondary.main}
                box1Description='Varaus on hyväksytty'
                box2Color={theme.palette.tertiary.main}
                box2Description='Varausta ei ole vielä hyväksytty'
              />
            </div>
          <Button variant='contained' color='primary' onClick={findProducts}>Etsi matskuja</Button>
         </div>;
};

export default BuyerHomePage;
