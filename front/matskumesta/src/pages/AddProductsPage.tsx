import React, { useState } from 'react';
import { Typography, IconButton, Button, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore';
import { fillManyProductDataWithImg, fillProductDataWithImg } from '../components/AiHandler';
import { useAuth } from '../context/authContext';
import { error } from 'console';

// Helper function to convert image to base64 format
const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { username, setLoadingMessage, setLoading, setErrorMessage, setFilledProduct, setManyFilledProducts, setSellerProductImg64 } = useStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [materialOption, setMaterialOption] = useState<'one' | 'multiple' | null>('one');

  const { token, logout } = useAuth();

  // Function to navigate back to the seller page
  const backToSellerPage = () => {
    navigate('/home');
  };

  // Function to handle image selection
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const base64Image = await convertToBase64(file);
      setSelectedImage(base64Image as string);
    }
  };

  //func to send the img for ai processing
  const sendImgToAi = async () => {
    try {
      setErrorMessage('');

      if(selectedImage && token){
        setLoadingMessage('Hetkinen... tulkitsen kuvaasi ja täytän tuotetietoja');
        setLoading(true);
        setSellerProductImg64(selectedImage);
        let aiJson;
        if(materialOption === 'one'){
          aiJson = await fillProductDataWithImg(selectedImage, logout, token);
          if(aiJson){
            setLoading(false);
            setErrorMessage('');
            if(typeof aiJson === 'string'){ //parse if string
              aiJson = JSON.parse(aiJson);
            }
            aiJson['id'] = 0;
            aiJson['image'] = selectedImage; 
            aiJson['color'] = 'yellow'; 
            aiJson['location'] = ''; 
            aiJson['packaging'] = ''; 
            aiJson['availability'] = '';

            let arr : any[] = [aiJson];
            setManyFilledProducts(arr);
            navigate('/confirmproducts');
          }
          else{
            throw new Error('Unable to fecth aidata');
          }

        }
        else{
          aiJson = await fillManyProductDataWithImg(selectedImage, logout, token);
          if(aiJson){
            setLoading(false);
            setErrorMessage('');
            if(typeof aiJson === 'string'){ //parse if string
              aiJson = JSON.parse(aiJson);
            }
            if(aiJson.title){ //this should trigger if there is only one product
              aiJson['id'] = 0;
              aiJson['image'] = selectedImage; 
              aiJson['color'] = 'yellow'; 
              aiJson['location'] = ''; 
              aiJson['packaging'] = ''; 
              aiJson['availability'] = '';
  
              let arr : any[] = [aiJson];
              setManyFilledProducts(arr);
              navigate('/confirmproducts');
            }
            else { //this should trigger if there are multiple products
              for(let i = 0; i < aiJson.length; i++){
                aiJson[i]['id'] = i;
                aiJson[i]['image'] = selectedImage; 
                aiJson[i]['color'] = 'yellow'; 
                aiJson[i]['location'] = ''; 
                aiJson[i]['packaging'] = ''; 
                aiJson[i]['availability'] = '';
              }
              setManyFilledProducts(aiJson);
              navigate('/confirmproducts');
            }

          }
          else{
            throw new Error('Unable to fecth aidata');
          }

        }
      }
      else{
        setErrorMessage('Lisää kuva jatkaaksesi.')
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(`Error occurred fetching AI response: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
      <IconButton onClick={backToSellerPage}>
        <ArrowBackIosIcon />
      
      <Typography variant="body1">Takaisin</Typography>
      </IconButton>
    </div>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Lisää matskuja
      </Typography>

      <Typography variant='body1' sx={{marginTop: '20px', marginBottom: '20px'}}>Kuvan lähetettyäsi tekoäly pyrkii tunnistamaan siitä tuotetiedot ja täyttämään tuotekortteihin mahdollisimman paljon tietoa sinulle valmiiksi.</Typography>

      {/* Image Selector */}
      <input
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        id="image-selector"
        onChange={handleImageChange}
      />
      <label htmlFor="image-selector">
        <Button variant="outlined" component="span">
          Valitse kuva
        </Button>
      </label>
      {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '30%', marginTop: 16 }} />}

      {/* Material Options - Linked Checkboxes/Radio Buttons */}
      <Typography variant="h6" style={{ marginTop: 24 }}>
        Materiaalin valinta
      </Typography>
      <RadioGroup
        value={materialOption}
        onChange={(e) => setMaterialOption(e.target.value as 'one' | 'multiple')}
      >
        <FormControlLabel
          value="one"
          control={<Radio />}
          label="Kuvassa on yhtä materiaalia"
        />
        <FormControlLabel
          value="multiple"
          control={<Radio />}
          label="Kuvassa on useampaa materiaalia"
        />
      </RadioGroup>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 24 }}
        onClick={() => sendImgToAi()}
      >
        Lähetä
      </Button>
    </div>
  );
};

export default AddProductsPage;
