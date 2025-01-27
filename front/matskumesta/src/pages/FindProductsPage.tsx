import React from 'react';
import useStore from '../stores/useStore';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import categories from '../assets/textRecommendations.json';
import { useAuth } from '../context/authContext';
import { analyzeUserText } from '../components/AiHandler';
import { fetchMatchingProdsByCategory, fetchRandomProducts, fetchMatchingProdsByKeywords } from '../components/ApiFetches';

const AddProductsPage: React.FC = () => {
  const { username, errorMessage, setErrorMessage, setLoading, setLoadingMessage, setFoundAiText, setBuyerFoundProducts } = useStore();
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  const backToBuyerPage = () => {
    navigate('/home');
  }

  //in this function we first take the input from user and check if any of its text matches our categories or keywords, if it does we dont need to query AI
  const receiveInputAndSearch = async (input : string) => {
    setLoadingMessage("Hetkinen...");
    setLoading(true);
    setErrorMessage("");
    const wordArray : string[] = categories;
    const stopWords = ["ja", "on", "tai", "että", "niin", "kun", "sekä", "kuin"];

    const findMatchingWords = (input: string): string[] => {
      return wordArray.filter((word) => input.toLowerCase().includes(word.toLowerCase()));
    };

    const extractKeywords = (userText: string): string[] => {
      const words = userText
        .toLowerCase()
        .split(/\s+/) // Split by spaces
        .map(word => word.replace(/[^a-zäöå0-9]+/gi, '')) // Remove non-alphanumeric characters
        .filter(word => word.length >= 3 && !stopWords.includes(word)) // Exclude short words and stop words
      
        //here would also be smart to use lemmatizing library like Voikko to turn the keywords into their base format but it would have to be built on another route on server for example

      return Array.from(new Set(words)); // Return unique keywords as array of striongs
    }
    
    const categoryMatches = findMatchingWords(input);
    const programmicalKeywords : string[] = extractKeywords(input);

    if(categoryMatches.length === 0){ //no matches, we query with keywords and lastly with AI to find matching products

      /*KEYWORD QUERY BLOCK*/

      let token2 : string = token || "juu"; 
      let userProductArray = await fetchMatchingProdsByKeywords(programmicalKeywords, logout, token2);
      if(userProductArray.length > 0){
        setLoading(false);
        setBuyerFoundProducts(userProductArray);
        navigate('/buyerfoundproducts');
      }

      /*AI QUERY BLOCK*/

      else{
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

            if(userProductArray.length === 0){ //no category matches
              let keywordCheckUserProductArray = await fetchMatchingProdsByKeywords(aiJson.keywords, logout, token2);

              if(keywordCheckUserProductArray.length === 0){ //no keyword matches
                setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
                //here do random products paste
                let userProductArray = await fetchRandomProducts(logout, token2);
                setLoading(false);
                setBuyerFoundProducts(userProductArray);
                navigate('/buyerfoundproducts');
              }
              else{ //keyword matches found
                setLoading(false);
                setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
                setBuyerFoundProducts(keywordCheckUserProductArray);
                navigate('/buyerfoundproducts');
              } 
            }
            else { //category matches found
              setLoading(false);
              setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
              setBuyerFoundProducts(userProductArray);
              navigate('/buyerfoundproducts');
            }
          }
        }
        else {
          setErrorMessage('Error occured fetching ai response, the service might be down please try again later.')
        }
      }
    }
    
    /*CATEGORY MATCHES FOUND BLOCK*/

    else{ //matches found, we can show matching categories of products straight to user, saving on ai costs
      let token2 : string = token || "juu"; 
      let userProductArray = await fetchMatchingProdsByCategory(categoryMatches, logout, token2);
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

  const receiveInputAndSearchOnlyAi = async (input: string) => {
    setLoadingMessage("Hetkinen...");
    setLoading(true);
    setErrorMessage("");

    /* AI QUERY BLOCK */

    let token2: string = token || "juu";
    let aiJson = await analyzeUserText(input, logout, token2);
    if (aiJson) {
        if (typeof aiJson === 'string') {
            aiJson = JSON.parse(aiJson);
        }
        if (aiJson.noCategoryMatches) {
            setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
            // Fetch and display random products
            let userProductArray = await fetchRandomProducts(logout, token2);
            setLoading(false);
            setBuyerFoundProducts(userProductArray);
            navigate('/buyerfoundproducts');
        } else {
            let categories: string[] = aiJson.categories;
            let userProductArray = await fetchMatchingProdsByCategory(categories, logout, token2);

            if (userProductArray.length === 0) { // No category matches
                let keywordCheckUserProductArray = await fetchMatchingProdsByKeywords(aiJson.keywords, logout, token2);

                if (keywordCheckUserProductArray.length === 0) { // No keyword matches
                    setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
                    // Fetch and display random products
                    let userProductArray = await fetchRandomProducts(logout, token2);
                    setLoading(false);
                    setBuyerFoundProducts(userProductArray);
                    navigate('/buyerfoundproducts');
                } else { // Keyword matches found
                    setLoading(false);
                    setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
                    setBuyerFoundProducts(keywordCheckUserProductArray);
                    navigate('/buyerfoundproducts');
                }
            } else { // Category matches found
                setLoading(false);
                setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
                setBuyerFoundProducts(userProductArray);
                navigate('/buyerfoundproducts');
            }
        }
    } else {
        setErrorMessage('Error occurred fetching AI response, the service might be down. Please try again later.');
    }
  };

  const receiveInputAndSearchAllMethods = async (input: string) => {
      setLoadingMessage("Hetkinen...");
      setLoading(true);
      setErrorMessage("");
  
      const uniqueProducts = new Map(); // To track products by title and avoid duplicates
  
      const addUniqueProducts = (products : any) => {
          products.forEach((product : any) => {
              if (!uniqueProducts.has(product.title)) {
                  uniqueProducts.set(product.title, product);
              }
          });
      };
  
      let token2: string = token || "juu";
  
      /* CATEGORY SEARCH */
      const wordArray: string[] = categories;
      const findMatchingWords = (input: string): string[] => {
          return wordArray.filter((word) => input.toLowerCase().includes(word.toLowerCase()));
      };
  
      const categoryMatches = findMatchingWords(input);
      if (categoryMatches.length > 0) {
          let categoryProducts = await fetchMatchingProdsByCategory(categoryMatches, logout, token2);
          addUniqueProducts(categoryProducts);
      }
  
      /* KEYWORD SEARCH */
      const stopWords = ["ja", "on", "tai", "että", "niin", "kun", "sekä", "kuin"];
      const extractKeywords = (userText: string): string[] => {
          const words = userText
              .toLowerCase()
              .split(/\s+/)
              .map(word => word.replace(/[^a-zäöå0-9]+/gi, ''))
              .filter(word => word.length >= 3 && !stopWords.includes(word));
  
          return Array.from(new Set(words)); // Unique keywords
      };
  
      const programmicalKeywords: string[] = extractKeywords(input);
      if (programmicalKeywords.length > 0) {
          let keywordProducts = await fetchMatchingProdsByKeywords(programmicalKeywords, logout, token2);
          addUniqueProducts(keywordProducts);
      }
  
      /* AI SEARCH */
      let aiJson = await analyzeUserText(input, logout, token2);
      if (aiJson) {
          if (typeof aiJson === 'string') {
              aiJson = JSON.parse(aiJson);
          }
  
          if (aiJson.noCategoryMatches) {
              setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
              let randomProducts = await fetchRandomProducts(logout, token2);
              addUniqueProducts(randomProducts);
          } else {
              let aiCategories: string[] = aiJson.categories;
              if (aiCategories.length > 0) {
                  let aiCategoryProducts = await fetchMatchingProdsByCategory(aiCategories, logout, token2);
                  addUniqueProducts(aiCategoryProducts);
              }
  
              let aiKeywords: string[] = aiJson.keywords;
              if (aiKeywords.length > 0) {
                  let aiKeywordProducts = await fetchMatchingProdsByKeywords(aiKeywords, logout, token2);
                  addUniqueProducts(aiKeywordProducts);
              }
          }
      } else {
          setErrorMessage('Error occurred fetching AI response, the service might be down. Please try again later.');
      }
  
      /* FINALIZE RESULTS */
      const finalProducts = Array.from(uniqueProducts.values());
      if (finalProducts.length === 0) {
          setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
          let randomProducts = await fetchRandomProducts(logout, token2);
          setBuyerFoundProducts(randomProducts);
      } else {
          setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
          setBuyerFoundProducts(finalProducts);
      }
  
      setLoading(false);
      navigate('/buyerfoundproducts');
  
  }

  const aiSearch2 = async (input: string) => {
    setLoadingMessage("Hetkinen...");
    setLoading(true);
    setErrorMessage("");

    try {
        /* AI QUERY BLOCK */

        let token2: string = token || "juu";
        let aiJson = await analyzeUserText(input, logout, token2);

        if (aiJson) {
            if (typeof aiJson === 'string') {
                aiJson = JSON.parse(aiJson);
            }

            let userProductArray = [];
            let categoriesMatch = [];
            let keywordsMatch = [];

            if (aiJson.noCategoryMatches) {
                setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");

                // Fetch and display random products
                userProductArray = await fetchRandomProducts(logout, token2);

            } else {
                // Fetch matching products by category
                let categories: string[] = aiJson.categories;
                categoriesMatch = await fetchMatchingProdsByCategory(categories, logout, token2);

                // Fetch matching products by keywords
                if (aiJson.keywords) {
                    keywordsMatch = await fetchMatchingProdsByKeywords(aiJson.keywords, logout, token2);
                }

                // Combine results ensuring unique products
                const uniqueProductsMap = new Map();
                
                [...categoriesMatch, ...keywordsMatch].forEach(userProduct => {
                    userProduct.products.forEach((product : any) => {
                        const uniqueKey = `${userProduct.username}-${product.title}`;
                        if (!uniqueProductsMap.has(uniqueKey)) {
                            uniqueProductsMap.set(uniqueKey, {
                                username: userProduct.username,
                                product: product
                            });
                        }
                    });
                });

                userProductArray = Array.from(uniqueProductsMap.values()).map(item => ({
                    username: item.username,
                    products: [item.product]
                }));
            }

            if (userProductArray.length === 0) {
                // Fetch and display random products if no matches are found
                setFoundAiText("Valikoimasta ei tällä kertaa löytynyt täysin tarpeisiisi sopivia matskuja, tässä kuitenkin muutamat satunnaiset matskut: ");
                userProductArray = await fetchRandomProducts(logout, token2);
            } else {
                setFoundAiText("Löysin valikoimasta nämä matskut jotka saattaisivat sopia tarpeisiisi: ");
            }

            setLoading(false);
            setBuyerFoundProducts(userProductArray);
            navigate('/buyerfoundproducts');
        } else {
            setErrorMessage('Error occurred fetching AI response, the service might be down. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
};



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
              Kerro mitä etsit tai mitä rakennat. Tekoäly löytää sinulle sopivat matskut.
            </Typography>
            <div className='input-box'>
              <InputField receiveInput={aiSearch2}/>
            </div>
        </div>;
};

export default AddProductsPage;