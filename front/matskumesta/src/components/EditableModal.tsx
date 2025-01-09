import React, { useEffect, useState, useRef } from 'react';
import { Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { Product } from './ProductGrid';
import useStore from '../stores/useStore';
import textRecommendations from './../assets/textRecommendations.json';

interface ModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const EditableModal: React.FC<ModalProps> = ({ product, onClose, isOpen }) => {
  const [editableProduct, setEditableProduct] = useState<Product>(product);
  const { selectedProduct, manyFilledProducts, setManyFilledProducts } = useStore();
  const [categories, setCategories] = useState(editableProduct.categories || []);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);


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

  const handleAddCategory = (category: string) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category].filter(
        (cat, index, self) => self.indexOf(cat) === index // Avoid duplicates
      );
      handleChange('categories', updatedCategories); // Pass updated list
      return updatedCategories;
    });
    setShowCategoryOptions(false);
  };
  
  const handleRemoveCategory = (index: number) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter((_, i) => i !== index);
      handleChange('categories', updatedCategories); // Pass updated list
      return updatedCategories;
    });
  };
  
  const handleChange = (
    field: keyof Product,
    value: string | string[],
    e?: any
  ) => {
    if (field === 'categories' && Array.isArray(value)) {
      setEditableProduct((prev) => ({
        ...prev,
        categories: value, // Use the passed-in updated list
      }));
      return; // Exit early for categories updates
    }
  
    if (field === 'description' && e) {
      e.target.style.height = 'auto'; // Reset the height to auto
      e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scroll height
    }
  
    setEditableProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangeOld = (field: keyof Product, value: string | string[], e?: any) => {
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

        {/* START OF NEW COMPO */}
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
    { label: 'Kategoriat', field: 'categories' },
  ].map(({ label, field }) => {
    const value = editableProduct[field as keyof Product];
    const stringValue = typeof value === 'string' || typeof value === 'number' ? String(value) : '';

    const qualityOptions = ['Erinomainen', 'Hyvä', 'Keskinkertainen', 'Heikko', 'Huono'];
    const categoryOptions = textRecommendations;

    return label === 'Kategoriat' ? (
      <div className="modal-field" key={field}>
        <Typography variant="subtitle1">{label}</Typography>
        <div className="categories-container">
          {/* Existing categories as buttons */}

          {
          editableProduct.categories ? (
          editableProduct.categories.map((category, index) => (
            <div key={index} className="category-item">
              <button className="category-button">
                {category}
                <span
                  className="delete-icon"
                  onClick={() => handleRemoveCategory(index)}
                >
                  ✖
                </span>
              </button>
            </div>
            ))
          ) : (null)
          }
        </div>

        {/* Add category button */}
        <button
          className="add-category-button"
          onClick={() => setShowCategoryOptions(!showCategoryOptions)}
        >
          Lisää kategoria
        </button>

        {/* Horizontal scrollable category options */}
        {showCategoryOptions && (
          <div className="category-options">
            {
            categoryOptions.filter((option) => !editableProduct.categories!.includes(option))
              .map((option, index) => (
                <button
                  key={index}
                  className="category-option-button"
                  onClick={() => handleAddCategory(option)}
                >
                  {option}
                </button>
              ))
            }
          </div>
        )}
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
    ) : label === 'Kuvaus' ? (
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
    )    
    : (
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
{/* END OF NEW COMPO */}

        {/* HERE STARTS OLD COMPO */}
        {/* <div className="modal-content">
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
            // { label: 'Käyttökohteet', field: 'usecases' },
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
            // ) : label === 'Käyttökohteet' ? (
            //   <div className="modal-field" key={field}>
            //     <Typography variant="subtitle1">{label}</Typography>
            //     <Select
            //       value={stringValue}
            //       onChange={(e) => handleChange(field as keyof Product, e.target.value)}
            //       variant="outlined"
            //       fullWidth
            //     >
            //       {useCaseOptions.map((option) => (
            //         <MenuItem key={option} value={option}>
            //           {option}
            //         </MenuItem>
            //       ))}
            //     </Select>
            //   </div>
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

        </div> */}
        {/* HERE ENDS OLD COMPO */}

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
