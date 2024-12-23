import React, { useEffect, useState, useRef } from 'react';
import { Typography, TextField, Button, Select, MenuItem } from '@mui/material';
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if(textarea){
      textarea.style.height = 'auto'; // Reset the height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust based on scroll height
    }
  }, []);

  useEffect(() => {
    setEditableProduct(selectedProduct);
  }, [selectedProduct]);

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  }

  const handleChange = (field: keyof Product, value: string, e?: any) => {
    if(field === 'description'){
      e.target.style.height = 'auto'; // Reset the height to auto
      e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scroll height
    }
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
    closeModal();
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
            { label: 'Kuvaus', field: 'description' },
            { label: 'Määrä', field: 'amount' },
            { label: 'Hinta', field: 'price' },
            { label: 'Paino', field: 'weight' },
            { label: 'Laatu', field: 'quality' },
            { label: 'Sijainti', field: 'location' },
            { label: 'Pakkaus', field: 'packaging' },
            { label: 'Jatkuva saatavuus', field: 'availability' },
            { label: 'Käyttökohteet', field: 'usecases' },
          ].map(({ label, field }) => {

            const value = editableProduct[field as keyof Product];

            // Check if the field is an array (like Reserver[]) and handle appropriately
            const stringValue = (typeof value === 'string' || typeof value === 'number') 
              ? String(value) 
              : '';

            // Quality options
            const qualityOptions = ['Erinomainen', 'Hyvä', 'Keskinkertainen', 'Heikko', 'Huono'];
            // Use case options
            const useCaseOptions = ['Rakentaminen', 'Sisustus', 'Remontointi', 'Lämmitys', 'Verhoilu'];

            return label === 'Kuvaus' ? (
              <div className="modal-field" key={field}>
                <Typography variant="subtitle1">{label}</Typography>
                <textarea
                  ref={textareaRef}
                  maxLength={300}
                  value={stringValue}
                  onChange={(e) => handleChange(field as keyof Product, e.target.value, e)}
                  className="editable-rounded-input"
                  placeholder="Kirjoita tähän kuvaus"
                  rows={8}
                  style={{
                    fontSize: '16px',
                    overflow: 'hidden',
                    resize: 'none',
                    minHeight: '40px',
                  }}
                />
              </div>
            ) : label === 'Laatu' ? (
              <div className="modal-field" key={field}>
                <Typography variant="subtitle1">{label}</Typography>
                <Select
                  value={stringValue}
                  onChange={(e) => handleChange(field as keyof Product, e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {qualityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : label === 'Käyttökohteet' ? (
              <div className="modal-field" key={field}>
                <Typography variant="subtitle1">{label}</Typography>
                <Select
                  value={stringValue}
                  onChange={(e) => handleChange(field as keyof Product, e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {useCaseOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              <div className="modal-field" key={field}>
                <Typography variant="subtitle1">{label}</Typography>
                <TextField
                  value={stringValue}
                  onChange={(e) => handleChange(field as keyof Product, e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </div>
            );
          })}

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
