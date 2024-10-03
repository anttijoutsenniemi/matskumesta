import React from 'react';
import useStore from '../stores/useStore';
import { Typography, IconButton, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const BuyerFoundProductsPage: React.FC = () => {
  const { foundAiText, buyerFoundProducts } = useStore();
  const navigate = useNavigate();

  const backToFindProductsPage = () => {
    navigate('/findproducts');
  }

  const goHome = () => {
    navigate('/home');
  }

  const handleProductClick = () => {
    //here next prompt a copy of the modal which has options to reserve the product
  }

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
                <IconButton onClick={backToFindProductsPage}>
                <ArrowBackIosIcon />
                
                <Typography variant="body1">Takaisin</Typography>
                </IconButton>
            </div>
            {/* Page Title */}
            <Typography variant="h4" gutterBottom>
                Löydä matskuja
            </Typography>
            <Typography variant="h6" gutterBottom sx={{marginBottom: '20px'}}>
                {foundAiText}
            </Typography>
            {(buyerFoundProducts)
              ? buyerFoundProducts.map((userAndProducts, index) => (
                <div key={index} style={{marginBottom: '10px', marginTop: '10px'}}>
                    <Typography sx={{marginBottom: '20px'}} variant='subtitle1'>Myyjän: {userAndProducts.username} matskut</Typography>
                    <ProductGrid products={userAndProducts.products} onProductClick={handleProductClick}/>
                </div>
              ))

              : null
            }
            <div style={{flexDirection: 'row'}}>
                <Button onClick={backToFindProductsPage} sx={{margin: '10px'}} variant='outlined' color='secondary'>Etsi uudestaan</Button>
                <Button onClick={goHome} sx={{margin: '10px'}} variant='contained' color='primary'>Etusivulle</Button>
            </div>
        </div>;
};

export default BuyerFoundProductsPage;