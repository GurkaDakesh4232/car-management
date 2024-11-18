import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCar } from '../../src/utils/api';

function DeleteCar({ carId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteCar(carId);
      navigate('/home'); // Redirect after deleting the car
    } catch (err) {
      console.error('Failed to delete car:', err);
    }
  };

  return <button onClick={handleDelete}>Delete Car</button>;
}

export default DeleteCar;
