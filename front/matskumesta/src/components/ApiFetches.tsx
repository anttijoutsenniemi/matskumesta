import axios from "axios";

export const signupSelf = async (reqBody: object) => {
    try {
        // const response = await axios.post('/auth/signup', 
        const response = await axios.post('http://localhost:8000/auth/signup', 
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
}

export const loginSelf = async (reqBody : object) => {
  try {
    //   const response = await axios.post('/auth/login',
      const response = await axios.post('http://localhost:8000/auth/login',
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
}