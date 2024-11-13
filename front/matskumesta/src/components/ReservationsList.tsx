import React from 'react';
import { Typography, Box, Button, Paper } from '@mui/material';
import { OpenReservation } from '../stores/useStore';

interface Props {
    productsWithReservers: OpenReservation[];
    onAccept: (productName: string, reserver: string) => void;
}

const ReservationsList: React.FC<Props> = ({ productsWithReservers, onAccept }) => {
    return (
        <div>
            <Typography variant='h5' sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Avoimet varaukset
            </Typography>
            {productsWithReservers.map((product) => (
                <Paper key={product.productName} sx={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant='h6'>{product.productName}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                        {product.reservers.map((reserver, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <Typography sx={{ marginRight: '10px' }}>
                                    {reserver.reserver} - {reserver.accepted ? 'Accepted' : 'Pending'}
                                </Typography>
                                {!reserver.accepted && (
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => onAccept(product.productName, reserver.reserver)}
                                    >
                                        Accept
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Paper>
            ))}
        </div>
    );
};

export default ReservationsList;
