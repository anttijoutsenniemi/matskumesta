// ColorBox.tsx
import React from 'react';
import { Box, Typography, styled } from '@mui/material';

// Define a styled component for the colored square
const ColoredSquare = styled(Box)<{ color: string }>(({ color }) => ({
  width: 24,
  height: 24,
  borderRadius: '4px',
  backgroundColor: color,
}));

// Define the props for the ColorBox component
interface ColorBoxProps {
  color: string;
  description: string;
}

// Create a component to render a colored square with a description
const ColorBox: React.FC<ColorBoxProps> = ({ color, description }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <ColoredSquare color={color} />
    <Typography>{description}</Typography>
  </Box>
);

// Define the props for the main component
interface TwoColorBoxesProps {
  box1Color: string;
  box1Description: string;
  box2Color: string;
  box2Description: string;
}

// Main component that renders two ColorBox components
const TwoColorBoxes: React.FC<TwoColorBoxesProps> = ({
  box1Color,
  box1Description,
  box2Color,
  box2Description,
}) => (
  <Box display="flex" flexDirection="row" alignItems='center' gap={2}>
    <ColorBox color={box1Color} description={box1Description} />
    <ColorBox color={box2Color} description={box2Description} />
  </Box>
);

export default TwoColorBoxes;