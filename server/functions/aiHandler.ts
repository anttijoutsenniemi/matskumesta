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
                  text: dedent`Could you help me make a product listing of the material/product in this image?
                        The product/material is to be sold on a used/excess material marketplace.
                        I will give you a JSON where you can fill all info of the product/material. In categories -key, choose which categories apply to 
                        the product and leave those as the value, you can select many if they fit the material/product.
                        Empty all other prefilled values and create new ones in finnish. In keywords -key, push important words
                        from the description and the quality -word as array of strings. 
                        Fill this JSON and return it only: ${fillableJson}`
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
                        In keywords -key, push important words
                        from the description and the word from quality -key as array of strings. 
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
            text: dedent`Can you help me find which of the given categories fit the needs described in this user typed text: ${userText} (end of user text).
            I will give you a JSON with the categories and other keys. Set noCategoryMatches -key to true if none of the categories fit. In explanation -key
            write in finnish your reasoning as to why chosen categories fit. In categories -key leave the matching categories and remove rest, you can choose
            multiple if they match. In keywords -key push to the array of strings all important words from user text the user might be searching for. 
            Fill this JSON and return it only: ${categories}`
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
