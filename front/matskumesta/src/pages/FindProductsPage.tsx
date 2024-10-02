import React from 'react';
import useStore from '../stores/useStore';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

const AddProductsPage: React.FC = () => {
  const { username } = useStore();
  const navigate = useNavigate();

  const backToBuyerPage = () => {
    navigate('/home');
  }

  const receiveInput = (input : string) => {
    console.log(input);
  }

  return  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Header Container */}
            <div
                style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                padding: '16px 0',
                }}
            >
                {/* Back Arrow and Text */}
                <IconButton onClick={backToBuyerPage}>
                <ArrowBackIosIcon />
                
                <Typography variant="body1">Takaisin</Typography>
                </IconButton>
            </div>
            {/* Page Title */}
            <Typography variant="h4" gutterBottom>
                Etsi matskuja
            </Typography>
            <Typography variant="h6" gutterBottom sx={{marginBottom: '20px'}}>
                Alla olevaan tekstilaatikkoon voit kuvailla omin sanoin mitä olet etsimässä. Voit kirjoittaa itse, valita ehdotuksista tai molemmat!
            </Typography>
            <div className='input-box'>
              <InputField receiveInput={receiveInput}/>
            </div>
        </div>;
};

export default AddProductsPage;