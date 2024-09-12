import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Product } from './ProductGrid';
import useStore from '../stores/useStore';

interface ModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const EditableModal: React.FC<ModalProps> = ({ product, onClose, isOpen }) => {
  const [editableProduct, setEditableProduct] = useState<Product>(product);
  const { selectedProduct, manyFilledProducts, setManyFilledProducts } = useStore();

  useEffect(() => {
    setEditableProduct(selectedProduct);
  }, [selectedProduct]);

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  }

  const handleChange = (field: keyof Product, value: string) => {
    setEditableProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const confirmProduct = () => {
    const updatedArr = manyFilledProducts.map((product : Product) =>
      product.id === editableProduct.id ? editableProduct : product
    );
    setManyFilledProducts(updatedArr);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <TextField
            label="Title"
            value={editableProduct.title}
            onChange={(e) => handleChange('title', e.target.value)}
            variant="outlined"
            fullWidth
          />
          <button onClick={closeModal} className="close-button">
            ✖
          </button>
        </header>

        <div className="modal-content">
          <div className="modal-image">
            <img src={editableProduct.image} alt={editableProduct.title} className="product-image" />
          </div>

          {[
            { label: 'Määrä', field: 'amount' },
            { label: 'Hinta', field: 'price' },
            { label: 'Paino', field: 'weight' },
            { label: 'Laatu', field: 'quality' },
            { label: 'Sijainti', field: 'location' },
            { label: 'Pakkaus', field: 'packaging' },
            { label: 'Jatkuva saatavuus', field: 'availability' },
          ].map(({ label, field }) => (
            <div className="modal-field" key={field}>
              <Typography variant="subtitle1">{label}</Typography>
              <TextField
                value={editableProduct[field as keyof Product]}
                onChange={(e) => handleChange(field as keyof Product, e.target.value)}
                variant="outlined"
                fullWidth
              />
              {/* <hr className="divider" /> */}
            </div>
          ))}
        </div>

        <footer className="modal-footer">

            <Button variant="contained" color="primary" onClick={confirmProduct}>
              Vahvista tuotetiedot
            </Button>

        </footer>
      </div>
    </div>
  );
};

export default EditableModal;
