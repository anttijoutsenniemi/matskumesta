import React from 'react';
import useStore from '../stores/useStore';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import categories from '../assets/textRecommendations.json';
import { useAuth } from '../context/authContext';
import { analyzeUserText } from '../components/AiHandler';
import { fetchMatchingProdsByCategory, fetchRandomProducts } from '../components/ApiFetches';

const AddProductsPage: React.FC = () => {
  const { username, errorMessage, setErrorMessage, setLoading, setLoadingMessage, setFoundAiText, setBuyerFoundProducts } = useStore();
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  const backToBuyerPage = () => {
    navigate('/home');
  }

  //in this function we first take the input from user and check if any of its text matches our categories, if it does we dont need to query AI
  const receiveInput = async (input : string) => {
    setLoadingMessage("Hetkinen... analysoin tekstiäsi ja etsin sopivia matskuja");
    setLoading(true);
    setErrorMessage("");
    const wordArray : string[] = categories;

    const findMatchingWords = (input: string): string[] => {
      return wordArray.filter((word) => input.toLowerCase().includes(word.toLowerCase()));
    };

    const matches = findMatchingWords(input);

    if(matches.length === 0){ //no matches, we query AI to find matching products
      let token2 : string = token || "juu"; 
      let aiJson = await analyzeUserText(input, logout, token2);
      if(aiJson){
        if(typeof aiJson === 'string'){
          aiJson = JSON.parse(aiJson);
        }
        if(aiJson.noCategoryMatches){
          setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
          //here do random products paste
          let userProductArray = await fetchRandomProducts(logout, token2);
          setLoading(false);
          setBuyerFoundProducts(userProductArray);
          navigate('/buyerfoundproducts');
        }
        else{
          let categories : string[] = aiJson.categories;
          let userProductArray = await fetchMatchingProdsByCategory(categories, logout, token2);
          if(userProductArray.length === 0){
            setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
            //here do random products paste
            let userProductArray = await fetchRandomProducts(logout, token2);
            setLoading(false);
            setBuyerFoundProducts(userProductArray);
            navigate('/buyerfoundproducts');
            
          }
          else {
            setLoading(false);
            setBuyerFoundProducts(userProductArray);
            navigate('/buyerfoundproducts');
          }
        }
      }
      else {
        setErrorMessage('Error occured fetching ai response, the service might be down please try again later.')
      }
    }
    else{ //matches found, we can show matching categories of products straight to user, saving on ai costs
      let token2 : string = token || "juu"; 
      let userProductArray = await fetchMatchingProdsByCategory(matches, logout, token2);
      if(userProductArray.length === 0){
        setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
        //here do random products paste
        let userProductArray = await fetchRandomProducts(logout, token2);
        setLoading(false);
        setBuyerFoundProducts(userProductArray);
        navigate('/buyerfoundproducts');
        
      }
      else{
        setLoading(false);
        setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
        setBuyerFoundProducts(userProductArray);
        navigate('/buyerfoundproducts');
      }
    }
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