import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { styled, useTheme } from '@mui/system';

interface ProductCardProps {
  title: string;
  image: string;
  color: string;
  id: number | string;
  onClick: (id: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, color, id, onClick }) => {
  const theme = useTheme();

  const StyledCard = styled(Card)<{ color: string }>(({ color }) => ({
    borderRadius: 10,
    transition: 'transform 0.3s',
    backgroundColor: color === 'green' ?  theme.palette.secondary.main : theme.palette.tertiary.main,
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
  }));
  
  return (
    <StyledCard color={color} onClick={() => onClick(id)}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        {(color === 'green')
        ? <Typography sx={{color: 'white'}} variant="h6">{title}</Typography>
        : <Typography variant="h6">{title}</Typography>
        }
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
