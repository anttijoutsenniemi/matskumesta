import { useEffect } from 'react';
import './../styles/modal.css';
import { Product } from './ProductGrid';
import useStore from '../stores/useStore';
import { Typography } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  product: Product;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, product }) => {
  const { isSeller } = useStore();

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  }

  const deleteProduct = () => {

  }

  const reserveProduct = () => {

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
            <Typography variant="subtitle1">Määrä</Typography>
            <Typography>{product.amount}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="subtitle1">Paino</Typography>
            <Typography>{product.weight}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="subtitle1">Laatu</Typography>
            <Typography>{product.quality}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="subtitle1">Sijainti</Typography>
            <Typography>{product.location}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="subtitle1">Pakkaus</Typography>
            <Typography>{product.packaging}</Typography>
            <hr className="divider" />
          </div>

          <div className="modal-field">
            <Typography variant="subtitle1">Jatkuva saatavuus</Typography>
            <Typography>{product.availability}</Typography>
            <hr className="divider" />
          </div>
        </div>

        <footer className="modal-footer">

        {(isSeller)
        ? <button className='modal-option-button' onClick={deleteProduct}>Poista tuote</button>
        : <button className='modal-option-button' onClick={reserveProduct}>Varaa tuote</button>
        }
        
        </footer>
      </div>
    </div>
  );
};

export default Modal;