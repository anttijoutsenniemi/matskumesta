import { useEffect } from 'react';
import './../styles/modal.css';
import { Product } from './ProductGrid';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';
import { deleteProduct } from './ApiFetches';
import { useAuth } from '../context/authContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  product: Product;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, product }) => {
  const { username, isSeller, setLoading, setLoadingMessage, setErrorMessage, setSellerFinalProducts } = useStore();
  const { logout, token } = useAuth();

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  }

  const deleteProductAndReturnNew = async () => {
    setLoading(true);
    setLoadingMessage('Deleting product...');
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

  const reserveProduct = () => {
    //next do reserve logic here (fill the products reservers-array with the username who clicked reserve product)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <Typography variant='h4'>{product.title}</Typography>
          <button onClick={() => closeModal()} className="close-button">✖</button>
        </header>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.title} className="product-image" />
          </div>

          <div className="modal-field">
            <Typography variant="h6" sx={{marginBottom: '10px'}}>Kuvaus</Typography>
            <Typography variant='body1' sx={{marginBottom: '10px'}}>{product.description || 'Ei määritelty'}</Typography>
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
            <button className='modal-option-button' onClick={reserveProduct}>Varaa tuote</button>
            <button className='modal-option-button' onClick={closeModal}>Sulje ikkuna</button>
          </>
        }
        
        </footer>
      </div>
    </div>
  );
};

export default Modal;