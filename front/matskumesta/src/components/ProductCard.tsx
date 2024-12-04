import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
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
    backgroundColor: color === 'green' ? theme.palette.secondary.main : theme.palette.tertiary.main,
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
    height: '280px', // Fixed height
    width: '280px', // Enforce consistent width
    maxWidth: '300px', // Constrain maximum width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box', // Ensure padding doesn't affect the width
  }));

  const StyledTypography = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Truncate long text
    width: '100%', // Prevent width inconsistencies due to text overflow
    textAlign: 'center', // Center align text for visual consistency
    boxSizing: 'border-box',
  });

  return (
    <StyledCard color={color} onClick={() => onClick(id)}>
      <Box
        sx={{
          height: '140px', // Fixed height for the image container
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden', // Prevent image overflow
          width: '100%', // Consistent width for the image container
        }}
      >
        <CardMedia
          component="img"
          src={image}
          alt={title}
          sx={{
            height: '100%',
            width: 'auto', // Maintain aspect ratio
            maxWidth: '100%', // Prevent image from exceeding container width
          }}
        />
      </Box>
      <CardContent sx={{ padding: '8px', width: '100%' }}>
        <StyledTypography
          variant="h6"
          sx={{
            color: color === 'green' ? 'white' : 'inherit',
          }}
        >
          {title}
        </StyledTypography>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
