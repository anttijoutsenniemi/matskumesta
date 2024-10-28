import axios from "axios";

export const fillProductDataWithImg = async (img64 : string, logout : any, token?: string) => {
    try {
        const response = await axios.post('/airoute/fillproductdatawithimg', 
      // const response = await axios.post('http://localhost:8000/airoute/fillproductdatawithimg',
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
        // Check if the error is an AxiosError and if the response status is 403
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          console.error('Access forbidden: You do not have permission to access this resource.', error);
          logout();
          // return { message: 'Access forbidden: You do not have permission to access this resource.' };
        } else {
          // Handle other errors
          console.error('There was an error!', error);
        }
    }
};

export const fillManyProductDataWithImg = async (img64 : string, logout: any, token?: string) => {
    try {
        const response = await axios.post('/airoute/fillmanyproductdatawithimg',  
      // const response = await axios.post('http://localhost:8000/airoute/fillmanyproductdatawithimg',
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
        // Check if the error is an AxiosError and if the response status is 403
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        console.error('Access forbidden: You do not have permission to access this resource.', error);
        logout();
        // return { message: 'Access forbidden: You do not have permission to access this resource.' };
      } else {
        // Handle other errors
        console.error('There was an error!', error);
      }
    }
};

export const analyzeUserText = async (userText : string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/airoute/analyzeUserText',  
    // const response = await axios.post('http://localhost:8000/airoute/analyzeUserText',
      { userText : userText }, //reqbody
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
      // Check if the error is an AxiosError and if the response status is 403
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      console.error('Access forbidden: You do not have permission to access this resource.', error);
      logout();
      // return { message: 'Access forbidden: You do not have permission to access this resource.' };
    } else {
      // Handle other errors
      console.error('There was an error!', error);
    }
  }
};