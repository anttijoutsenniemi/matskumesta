import { useEffect } from 'react';
import './../styles/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  product: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, product }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h1>{product.title}</h1>
          <button onClick={() => closeModal()} className="close-button">✖</button>
        </header>

        <footer className="modal-footer">
          {/* <button className='modal-option-button' onClick={() => openInOnlineMarketplace()}>Open in 3D-view at home</button> */}
          {/* <button className='modal-option-button' onClick={() => openInOnlineMarketplace()}>Open in online store</button> */}

        <button className='modal-option-button'>Avaa verkkokaupassa</button>

        </footer>
      </div>
    </div>
  );
};

export default Modal;