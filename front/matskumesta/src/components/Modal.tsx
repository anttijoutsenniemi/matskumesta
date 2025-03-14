import { useEffect } from 'react';
import './../styles/modal.css';
import { Product } from './ProductGrid';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';
import { deleteProduct, reserveProduct } from './ApiFetches';
import { useAuth } from '../context/authContext';
import { fetchOneEmail } from './ApiFetches';
import ReservationAccepted from './ContactInfoCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  product: Product;
  sellername?: string;
  accepted?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, product, sellername, accepted }) => {
  const { username, isSeller, setLoading, setLoadingMessage, setErrorMessage, setSellerFinalProducts } = useStore();
  const { logout, token } = useAuth();

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  }

  const fetchEmail = async () => {
    if(sellername){
      let token2 : string = token || "juu";
      let email : string = await fetchOneEmail(sellername, logout, token2);
      return email;
    }
    else{
      return "Virhe tapahtui yhteystietoja hakiessa";
    }
  }

  const deleteProductAndReturnNew = async () => {
    setLoading(true);
    setLoadingMessage('Poistetaan tuote...');
    let token2 : string = token || 'juu';
    let dbProcess = await deleteProduct(username, product, logout, token2);
    if(dbProcess.ok){
      setLoading(false);
      setErrorMessage('');
      let newProducts = dbProcess.document.products;
      setSellerFinalProducts(newProducts);
    }
    else{
      setLoading(false);
      setErrorMessage('Error occured deleting product, check your connection and try again later.')
    }
    closeModal();
  }

  const reserveProductHandler = async () => {
    //next do reserve logic here (fill the products reservers-array with the username who clicked reserve product)
    setLoading(true);
    setLoadingMessage('Varataan tuotetta...');
    let token2 : string = token || 'juu';
    let seller : string = sellername || "testi";
    let dbProcess = await reserveProduct(seller, product, username, logout, token2);
    if(dbProcess.ok){
      setLoading(false);
      setErrorMessage('');
      let newProducts = dbProcess.document.products;
      alert('Tuote varattu! Saat myyjän yhteystiedot näkyviin kun varaus on hyväksytty.');
    }
    else{
      setLoading(false);
      setErrorMessage('Error occured deleting product, check your connection and try again later.')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header" style={{marginBottom: '10px'}}>
          <Typography variant='h4'>{product.title}</Typography>
          <button onClick={() => closeModal()} className="close-button">✖</button>
        </header>

        {(accepted && product.reservers?.some(reserver => reserver.reserver === username && reserver.accepted))
          ? <ReservationAccepted fetchEmail={fetchEmail}/>
          : null
        }

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.title} className="product-image" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Kuvaus</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.description || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          {/* <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Käyttökohteet</Typography>
            {(product.useCases)
            ?
            <>
            {            
              product.useCases?.map((usecase, index) => (
              <div key={index} style={{backgroundColor: 'grey', padding: '5px', borderRadius: '10px', marginBottom: '5px', marginTop: '5px'}}>
                <Typography variant='body1' sx={{marginBottom: '10px'}}>{usecase}</Typography>
              </div>
            ))}
              </>
            : <Typography variant='body1' sx={{marginBottom: '10px'}}>Ei määritelty</Typography>
            }
            <hr className="divider" />
          </div> */}

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Hinta</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.price || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Määrä</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.amount || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Paino</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.weight || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Laatu</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.quality || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Sijainti</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.location || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Pakkaus</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.packaging || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Jatkuva saatavuus</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.availability || 'Ei määritelty'}</Typography>
            <hr className="divider" />
          </div>
        </div>

        <footer className="modal-footer">

        {(isSeller)
        ? <>
            <button className='modal-option-button' onClick={deleteProductAndReturnNew}>Poista tuote</button>
            <button className='modal-option-button' onClick={closeModal}>Sulje ikkuna</button>
          </>
        : <>
            { (!accepted)  //we dont want to show this on screen where are already all reserved products
              ? <button className='modal-option-button' onClick={reserveProductHandler}>Varaa tuote</button>
              : null
            }
            <button className='modal-option-button' onClick={closeModal}>Sulje ikkuna</button>
          </>
        }
        
        </footer>
      </div>
    </div>
  );
};

export default Modal;