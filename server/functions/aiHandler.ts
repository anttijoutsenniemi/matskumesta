import axios from "axios";
import dedent from "dedent";
import product from './../json/product.json';
import emptyProduct from './../json/emptyProduct.json';
import products from './../json/manyProducts.json';
import emptyManyProducts from './../json/emptyManyProducts.json';
import productCategories from './../json/productCategories.json';

export const fillDataForSingleProduct = async (picUrl : string) => {
    try {
    //this is for testing, comment this return statement to enable Ai
    // return dedent`{
    //     "title": "Tammilautaa",
    //     "description": "Käsittelemätöntä hiomatonta lautaa. Lautojen pituudet vaihtelevat noin metristä kolmeen metriin.",
    //     "amount": "noin. 100 kpl.",
    //     "weight": "noin. 500kg.",
    //     "quality": "Hyvä, ei käytetty rakentamiseen."
    // }`
      
      const apiKey = process.env.OPENAI_API_KEY;
      // const fillableJson = JSON.stringify(product);
      const fillableJson = JSON.stringify(emptyProduct);
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          //model: "gpt-4-turbo",
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
              {
                  type: "text",
                  text: dedent`Voisitko auttaa minua luomaan tuotelistauksen tämän kuvan materiaalista/tuotteesta?  
                  Materiaali/tuote on tarkoitus myydä käytettyjen/yli jääneiden materiaalien markkinapaikalla.  
                  Annan sinulle JSON-tiedoston, johon voit täyttää kaikki materiaalin/tuotteen tiedot.  
                  "categories" -avaimen kohdalla valitse vaihtoehdoista, mitkä kategoriat sopivat tuotteeseen/materiaaliin, ja jätä vain ne arvoksi. Voit valita useita kategorioita, jos ne sopivat tuotteeseen/materiaaliin.  
                  "keywords" -avaimen kohdalla lisää tärkeimmät sanat luomastasi tuotteen kuvauksesta taulukkoon merkkijonoina.  
                  Täytä tämä JSON-tiedosto ja palauta vain se: ${fillableJson}`
              },
              {
                  type: "image_url",
                  image_url: {
                    url: `${picUrl}`
                    //url: "https://images.tori.fi/api/v1/imagestori/images/100261082365.jpg?rule=medium_660",
                  },
              },
              ],
            },
          ],
          max_tokens: 1000,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      let answer = result.data.choices[0].message.content;
      return answer;
    } catch (error) {
      console.log("Error occured getting ai response: ", error);
      return false
    } 
  };

  export const fillDataForManyProduct = async (picUrl : string) => {
    try {
    //this is for testing, comment this return statement to enable Ai
    //return dedent`[
    //     {
    //         "title": "Tammilautaa",
    //         "description": "Käsittelemätöntä hiomatonta lautaa. Lautojen pituudet vaihtelevat noin metristä kolmeen metriin.",
    //         "amount": "noin. 100 kpl.",
    //         "weight": "noin. 500kg.",
    //         "quality": "Hyvä, ei käytetty rakentamiseen."
    //     },
    //     {
    //         "title": "Vanhoja autonrenkaita",
    //         "description": "Nastattomia renkaita, pelkkää kumia.",
    //         "amount": "noin. 50 paria.",
    //         "weight": "noin. 1500kg.",
    //         "quality": "Käytetty."
    //     }
    // ]`
      
      const apiKey = process.env.OPENAI_API_KEY;
      // const fillableJson = JSON.stringify(products);
      const fillableJson = JSON.stringify(emptyManyProducts);
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          //model: "gpt-4-turbo",
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
              {
                  type: "text",
                  text: dedent`Could you help me make a product listing of the materials/products in this image?
                        The product/material is to be sold on a used/excess material marketplace.
                        I will give you an array of JSON obejcts where you can fill all info of the products/materials.
                        In keywords -key, push important words from the description as array of strings. 
                        In categories -key, choose which categories apply to 
                        the product and leave those as the value, you can select many if they fit the material/product. 
                        If you detect multiple products/materials from the image,
                        you can add each of them as its own entry in the array. If you only detect one, return an array with just its info.
                        Empty all prefilled values and create new ones in finnish.
                        Fill this array and return it only: ${fillableJson}`
              },
              {
                  type: "image_url",
                  image_url: {
                    url: `${picUrl}`
                    //url: "https://images.tori.fi/api/v1/imagestori/images/100261082365.jpg?rule=medium_660",
                  },
              },
              ],
            },
          ],
          max_tokens: 1000,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      let answer = result.data.choices[0].message.content;
      return answer;
    } catch (error) {
      console.log("Error occured getting ai response: ", error);
      return false
    } 
  };

  export const analyzeUserText = async (userText : string) => {
    try {
      // this is for testing, commnent to enable AI
      // return `{
      //   "noCategoryMatches": false,
      //   "explanation": "Testingtext: I think these categories will suit your needs:",
      //   "categories": [
      //       "sahatavara",
      //       "laudat",
      //       "kupari"
      //   ]
      // }`
      const apiKey = process.env.OPENAI_API_KEY;

      const categories = JSON.stringify(productCategories);

      //our initial prompt with userText and categories
      let contentArray : object[] = [
        {
            type: "text",
            text: dedent`Voisitko auttaa minua selvittämään, mitkä annetuista kategorioista sopivat käyttäjän kirjoittamassa tekstissä kuvattuihin tarpeisiin: ${userText} (käyttäjän teksti päättyy).  
            Annan sinulle JSON-tiedoston, joka sisältää kategoriat ja muita avaimia.  
            Aseta "noCategoryMatches" -avain arvoon true, jos mikään kategorioista ei sovi.  
            "explanation" -avaimen kohdalle kirjoita suomeksi perustelusi siitä, miksi valitsemasi kategoriat sopivat.  
            "categories" -avaimen kohdalla jätä vain ne kategoriat, jotka sopivat, ja poista muut. Voit valita useita, jos ne sopivat.  
            "keywords" -avaimen kohdalle lisää kaikki tärkeät sanat käyttäjän tekstistä merkkijonotaulukkoon, joita käyttäjä saattaisi etsiä.  
            Täytä tämä JSON-tiedosto ja palauta vain se: ${categories}`
        }
      ]
      
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          //model: "gpt-4-turbo",
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: contentArray,
            },
          ],
          max_tokens: 1000,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      //console.log(result.data.choices[0].message.content);
      let answer = result.data.choices[0].message.content;
      return answer;
    } catch (error) {
      console.log("Error occured getting ai response: ", error);
      return false
    } 
  };
