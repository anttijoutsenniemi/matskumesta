import React, { useEffect } from 'react';
import useStore, { UserProductArray } from '../stores/useStore';
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

  // Function to check for a specific reserver and update the product color
  const checkReserverAndUpdateColor = (productsData: UserProductArray[], username: string) => {
    productsData.forEach((userProduct) => {
      userProduct.products.forEach((product) => {
        product.color = 'yellow';

        const hasAcceptedReserver = product.reservers?.some(
          (reserver) => reserver.reserver === username && reserver.accepted
        );
        if (hasAcceptedReserver) {
          product.color = 'green';
        }
      });
    });
    return productsData;
  };

  useEffect(() => { //we fetch and fill products if found on app start
    const fetchData = async () => {
      if (!buyerReservedProducts) {
        try {
          let token2 : string = token || 'juu';
          let newProducts = await fetchBuyerReservedProducts(username, logout, token2);
          if(newProducts.ok){ //should return null if user has no products
            let products = newProducts.document;
            let filteredProducts = checkReserverAndUpdateColor(products, username);
            setBuyerReservedProducts(filteredProducts);
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

  const fetchReservedProducts = async () => {
    try {
      let token2 : string = token || 'juu';
      let newProducts = await fetchBuyerReservedProducts(username, logout, token2);
      if(newProducts.ok){ //should return null if user has no products
        let products = newProducts.document;
        let filteredProducts = checkReserverAndUpdateColor(products, username);
        setBuyerReservedProducts(filteredProducts);;
      }
      else{
        setBuyerReservedProducts(null);
      }
    } catch (error) {
      console.error('Error fetching buyer products:', error);
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => setModalOpen(false);

  const handleProductClick = (id: string | number, user?: string) => {

    if(buyerReservedProducts && user){
      let identifier : number = Number(id);
      const newUser = buyerReservedProducts.find(userProd => userProd.username === user);

      if (newUser && identifier >= 0 && identifier < newUser.products.length) {
        let newProduct : Product = newUser.products[identifier];
        setSelectedProduct(newProduct);
        openModal();
      }

    }
  };

  const findProducts = () => {
    navigate('/findproducts');
  }

  return <div>
          <Typography variant='h4' style={{marginBottom: '20px'}}>Ostaja {username}</Typography>
          <Button sx={{margin: "5px"}} variant='contained' color='primary' onClick={findProducts}>Etsi matskuja</Button>
          <Typography variant='h5' sx={{marginTop: '20px', marginBottom: '20px'}}>Varatut matskuni</Typography>
            <div className='matskut-container' style={{marginTop: '10px', marginBottom: '10px'}}>
              {
                (buyerReservedProducts)
                ?  buyerReservedProducts.map((userAndProducts, index) => (
                    <div key={index} style={{marginBottom: '10px', marginTop: '10px'}}>
                      <Typography sx={{marginBottom: '20px'}} variant='subtitle1'>Myyjä {userAndProducts.username}</Typography>
                      <ProductGrid products={userAndProducts.products} user={userAndProducts.username} onProductClick={handleProductClick}/>
                      <Modal title='Matskun tiedot' product={selectedProduct} isOpen={modalOpen} accepted sellername={userAndProducts.username} onClose={closeModal}/>
                    </div>
                ))              
                  
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
         </div>;
};

export default BuyerHomePage;
