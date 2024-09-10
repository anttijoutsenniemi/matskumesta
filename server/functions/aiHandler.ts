import axios from "axios";
import dedent from "dedent";
import product from './../json/product.json';
import products from './../json/manyProducts.json';

export const fillDataForSingleProduct = async (picUrl : string) => {
    try {
    //this is for testing, comment this return statement to enable Ai
    return dedent`{
        "title": "Tammilautaa",
        "description": "Käsittelemätöntä hiomatonta lautaa. Lautojen pituudet vaihtelevat noin metristä kolmeen metriin.",
        "amount": "noin. 100 kpl.",
        "weight": "noin. 500kg.",
        "quality": "Hyvä, ei käytetty rakentamiseen."
    }`
      
      const apiKey = process.env.OPENAI_API_KEY;
      const fillableJson = JSON.stringify(product);
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
                        I will give you a JSON where you can fill all info of the product/material. The JSON comes prefilled
                        with data to give you an idea of how the data might look. Empty all prefilled values and create new ones in finnish. 
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
      const fillableJson = JSON.stringify(products);
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
                        I will give you a JSON where you can fill all info of the products/materials. The JSON comes prefilled
                        with data to give you an idea of how the data might look. If you detect multiple products/materials from the image,
                        you can add each of them as its own entry in the array. If you only detect one, return an array with just its info.
                        Empty all prefilled values and create new ones in finnish. 
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
