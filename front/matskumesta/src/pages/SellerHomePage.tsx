import React, { useEffect } from 'react';
import useStore, { OpenReservation } from '../stores/useStore';
import { Button, Typography, useTheme } from '@mui/material';
import Modal from '../components/Modal';
import ProductGrid, { Product } from '../components/ProductGrid';
import naama from './../assets/naama.png';
import salama from './../assets/salama.png';
import styx from './../assets/styx.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { fetchOpenReservations, fetchSellerProducts, acceptReservation } from '../components/ApiFetches';
import TwoColorBoxes from '../components/ColorBoxes';
import ReservationsList from '../components/ReservationsList';

const HomePage: React.FC = () => {
  const { username, modalOpen, setModalOpen, setSelectedProduct, selectedProduct, sellerFinalProducts, setSellerFinalProducts, openReservations, setOpenReservations } = useStore();
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
      if (!openReservations) {
        try {
          let token2 : string = token || 'juu';
          let reservations = await fetchOpenReservations(username, logout, token2);
          if(reservations){
            setOpenReservations(reservations);
          }
          else{
            setOpenReservations(null);
          }
        } catch (error) {
          console.error('Error fetching open reservations');
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
      image: naama,
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
      title: 'Product 2 juu',
      description: 'A vibrant yellow product.',
      image: salama,
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
      title: 'Product 3 juujaajooh pröööööööööt',
      description: 'A sturdy green product.',
      image: styx,
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

  const acceptReservationFront = async (productName : string, reserver : string) => {
    let token2 : string = token || 'juu';
    let productToEdit : any = sellerFinalProducts?.find(product => product.title === productName);
    let acceptAttempt = await acceptReservation(username, productToEdit, reserver, logout, token2);
    if(acceptAttempt.ok){ //should return null if user has no products
      if(openReservations){
        // Make a shallow copy of the openReservations
        let updatedReservations = [...openReservations];

        // Find the product and update the reserver's accepted status
        const productIndex = updatedReservations.findIndex(product => product.productName === productName);
        if (productIndex !== -1) {
            // Deep copy of the reservers array to safely modify it
            let updatedReservers = [...updatedReservations[productIndex].reservers];
            const reserverIndex = updatedReservers.findIndex(res => res.reserver === reserver);
            if (reserverIndex !== -1) {
                updatedReservers[reserverIndex] = {...updatedReservers[reserverIndex], accepted: true};
            }

            // Set the updated reservers back to the product
            updatedReservations[productIndex] = {
                ...updatedReservations[productIndex],
                reservers: updatedReservers
            };
        }

        // Set the updated reservations back to the state
        setOpenReservations(updatedReservations);
      }
    }
    else{
      alert('Acception failed! try again later');
    }
  }

  return <div>
          <Typography variant='h4' style={{marginBottom: '20px'}}>Myyjä {username}</Typography>
          <Button variant='contained' color='primary' onClick={addProducts}>Lisää matskuja</Button>
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

          <div>
            <Typography variant='h5' sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Avoimet varaukset
            </Typography>
            { 
              (openReservations)
              ? <ReservationsList productsWithReservers={openReservations} onAccept={acceptReservationFront}/>
              : <Typography variant='subtitle1'>Ei avoimia varauksia</Typography>
            }
            
          </div>
         </div>;
};

export default HomePage;
