import React from 'react';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';

export interface Reserver {
  reserver: string;
  accepted: boolean;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
  categories?: string[];
  useCases?: string[];
  reservers?: Reserver[];
  keywords?: string[];
  price?: string;
  amount?: string;
  weight?: string;
  quality?: string;
  location?: string;
  packaging?: string;
  availability?: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (id: string | number, user?: string) => void;
  user?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, user }) => {
  // Sort products: green first, yellow second
  const sortedProducts = products.sort((a, b) => (a.color === 'green' ? -1 : 1));

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent={{
        xs: 'center', //center on mobile
        md: sortedProducts.length === 1 ? 'center' : 'space-between'}} // Center single card
      sx={{
        gap: 2, // Space between the cards
      }}
    >
      {sortedProducts.map((product, index) => (
        <Box
          key={index}
          flexBasis={{ xs: 'calc(40% - 8px)', md: 'calc(33.33% - 16px)' }} // 2 in a row on mobile, 3 in a row on desktop
          mb={2} // Margin-bottom for rows
        >
          {user ? (
            <ProductCard
              id={index}
              title={product.title}
              image={product.image}
              color={product.color}
              onClick={() => onProductClick(index, user)}
            />
          ) : (
            <ProductCard
              id={index}
              title={product.title}
              image={product.image}
              color={product.color}
              onClick={onProductClick}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProductGrid;
