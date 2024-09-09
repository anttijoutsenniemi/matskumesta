import React from 'react';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (title: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  // Sort products: green first, yellow second
  const sortedProducts = products.sort((a, b) => (a.color === 'green' ? -1 : 1));

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      sx={{
        gap: 2, // Space between the cards
      }}
    >
      {sortedProducts.map((product) => (
        <Box
          key={product.id}
          flexBasis={{ xs: 'calc(50% - 8px)', md: 'calc(33.33% - 16px)' }} // 2 in a row on mobile, 3 in a row on desktop
          mb={2} // Margin-bottom for rows
        >
          <ProductCard
            title={product.title}
            image={product.image}
            color={product.color}
            onClick={onProductClick}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ProductGrid;
