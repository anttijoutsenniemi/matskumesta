import axios from "axios";

export const fillProductDataWithImg = async (img64 : string, token?: string) => {
    try {
        //const response = await axios.post('/airoute/fillproductdatawithimg', 
      const response = await axios.post(
        'http://localhost:8000/airoute/fillproductdatawithimg',
        { img : img64 }, //reqbody
        {
          headers: {
            // Include the JWT token in the Authorization header if provided
            Authorization: token ? `Bearer ${token}` : '',
          },
        //   auth: {
        //     username: process.env.REACT_APP_TESTER_USERNAME!,
        //     password: process.env.REACT_APP_TESTER_PASSWORD!,
        //   },
        }
      );
      return response.data;
    } catch (error) {
      console.error('There was an error!', error);
    }
};

export const fillManyProductDataWithImg = async (img64 : string, token?: string) => {
    try {
        //const response = await axios.post('/airoute/fillmanyproductdatawithimg',  
      const response = await axios.post(
        'http://localhost:8000/airoute/fillmanyproductdatawithimg',
        { img : img64 }, //reqbody
        {
          headers: {
            // Include the JWT token in the Authorization header if provided
            Authorization: token ? `Bearer ${token}` : '',
          },
        //   auth: {
        //     username: process.env.REACT_APP_TESTER_USERNAME!,
        //     password: process.env.REACT_APP_TESTER_PASSWORD!,
        //   },
        }
      );
      return response.data;
    } catch (error) {
      console.error('There was an error!', error);
    }
};