import axios from "axios";
import { Product } from "./ProductGrid";

export const signupSelf = async (reqBody: object) => {
    try {
        const response = await axios.post('/auth/signup',
        // const response = await axios.post('http://localhost:8000/auth/signup', 
        reqBody, //req.body
        {
          auth: {
              username: process.env.REACT_APP_TESTER_USERNAME!,
              password: process.env.REACT_APP_TESTER_PASSWORD!
          }
      });
        return response.data;
      } catch (error) {
        console.error('There was an error!', error);
      }
};

export const loginSelf = async (reqBody : object) => {
  try {
      const response = await axios.post('/auth/login',
      // const response = await axios.post('http://localhost:8000/auth/login',
      reqBody, //req.body
      {
        auth: {
            username: process.env.REACT_APP_TESTER_USERNAME!,
            password: process.env.REACT_APP_TESTER_PASSWORD!
        }
    });
      return response.data;
    } catch (error) {
      console.error('There was an error!', error);
    }
};

export const fetchSellerProducts = async (username : string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/fetchSellerProducts',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchSellerProducts',
      { username : username }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const addProducts = async (username : string, products: Product[], logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/addProducts',  
    // const response = await axios.post('http://localhost:8000/apiroute/addProducts',
      { username : username, products: products }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const deleteProduct = async (username : string, productToDelete: Product, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/deleteProduct',  
    // const response = await axios.post('http://localhost:8000/apiroute/deleteProduct',
      { username : username, productToDelete: productToDelete }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const fetchBuyerReservedProducts = async (username : string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/fetchBuyerReservedProducts',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchBuyerReservedProducts',
      { username : username }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const fetchOneEmail = async (username : string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/fetchOneEmail',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchOneEmail',
      { username : username }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const fetchMatchingProdsByCategory = async (categories : string[], logout: any, token?: string) => {
  try {
    const response = await axios.post('/apiroute/fetchMatchingProdsByCategory',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchMatchingProdsByCategory',
      { categories : categories }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const fetchRandomProducts = async (logout: any, token?: string) => {
  try {
    const response = await axios.post('/apiroute/fetchRandomProducts',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchRandomProducts',
      { message: "mo" }, //post request has to have body or auth headers turn in to body in axios
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const fetchMatchingProdsByKeywords = async (keywords : string[], logout: any, token?: string) => {
  try {
    const response = await axios.post('/apiroute/fetchMatchingProdsByKeywords',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchMatchingProdsByKeywords',
      { keywords : keywords }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const reserveProduct = async (username : string, product: Product, reserver: string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/addReserver',  
    // const response = await axios.post('http://localhost:8000/apiroute/addReserver',
      { username : username, product: product, reserver: reserver }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const acceptReservation = async (username : string, product: Product, reserver: string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/acceptReservation',  
    // const response = await axios.post('http://localhost:8000/apiroute/acceptReservation',
      { username : username, product: product, reserver: reserver }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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

export const fetchOpenReservations = async (username : string, logout: any, token?: string) => {
  try {
      const response = await axios.post('/apiroute/fetchOpenReservations',  
    // const response = await axios.post('http://localhost:8000/apiroute/fetchOpenReservations',
      { username : username }, //reqbody
      {
        headers: {
          // Include the JWT token in the Authorization header if provided
          Authorization: token ? `Bearer ${token}` : '',
        }
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