import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

function EditCar() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({
    title: '',
    description: '',
    images: [],
    tags: '',
    car_type: '',
    company: '',
    dealer: '',
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`cars/${id}`);
        setCarDetails(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCar();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`cars/update/${id}`, carDetails);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add the input fields for editing the car */}
      <button type="submit">Update Car</button>
    </form>
  );
}

export default EditCar;
