import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const BASE_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/users/login`, credentials); // Adjust URL as needed
};

export const signupUser = async (userData) => {
  return axios.post(`${API_URL}/users/signup`, userData); // Adjust URL as needed
};

export const addCar = async (carData) => {
    return axios.post(`${API_URL}/cars/add`, carData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  export const getCars = async () => {
    try {
      const response = await axios.get('/api/cars/get'); // Update this endpoint if needed
      console.log('API Response:', response.data); // Debug the response
      return Array.isArray(response.data) ? response.data : []; // Ensure it returns an array
    } catch (error) {
      console.error('Error fetching cars:', error);
      return []; // Return an empty array in case of an error
    }
  };
  

  
  export const getCarDetail = async (id) => {
    return axios.get(`${API_URL}/cars/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  
  export const deleteCar = async (id) => {
    return axios.delete(`${API_URL}/cars/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };
  
  export const updateCar = async (carId, carData) => {
    try {
      const response = await axios.put(`/api/cars/update/${carId}`, carData);
      return response.data;
    } catch (error) {
      console.error("Error updating car:", error);
      throw error;
    }
  };


  export const registerUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  };