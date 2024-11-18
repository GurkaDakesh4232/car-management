import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCar, getCarDetail, updateCar } from '../utils/api';
import { format } from 'date-fns';
import '../../src/App.css';

const AddCar = () => {
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    car_type: '',
    company: '',
    dealer: '',
    tags: '',
    images: '',
    createdAt: '',
    updatedAt: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getCarDetail(id).then((car) => {
        setCarData({
          title: car.title,
          description: car.description,
          car_type: car.car_type,
          company: car.company,
          dealer: car.dealer,
          tags: car.tags.join(', '),
          images: car.images.join(', '),
          createdAt: car.createdAt,
          updatedAt: car.updatedAt,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = carData.tags.split(',').map((tag) => tag.trim());
    const imagesArray = carData.images.split(',').map((image) => image.trim());

    const carDetails = {
      ...carData,
      tags: tagsArray,
      images: imagesArray,
      createdAt: carData.createdAt,
      updatedAt: carData.updatedAt,
    };

    try {
      if (isEditing) {
        await updateCar(id, carDetails);
      } else {
        await addCar(carDetails);
      }
      navigate('/cars');
    } catch (error) {
      console.error('Error submitting car data:', error);
    }
  };

  return (
    <div className="add-car-container">
      <h2>{isEditing ? 'Update Car' : 'Add Car'}</h2>
      <form onSubmit={handleSubmit} className="add-car-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={carData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={carData.description}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            name="car_type"
            value={carData.car_type}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={carData.company}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Dealer</label>
          <input
            type="text"
            name="dealer"
            value={carData.dealer}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={carData.tags}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Images (comma separated URLs)</label>
          <input
            type="text"
            name="images"
            value={carData.images}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Car' : 'Add Car'}
        </button>
      </form>

      {isEditing && (
        <div className="car-details">
          <h3>Car Details:</h3>
          <p><strong>Title:</strong> {carData.title}</p>
          <p><strong>Description:</strong> {carData.description}</p>
          <p><strong>Type:</strong> {carData.car_type}</p>
          <p><strong>Company:</strong> {carData.company}</p>
          <p><strong>Dealer:</strong> {carData.dealer}</p>
          <p><strong>Tags:</strong> {carData.tags}</p>
          <p><strong>Images:</strong> {carData.images}</p>
          <p><strong>Created At:</strong> {format(new Date(carData.createdAt), 'MMMM dd, yyyy hh:mm a')}</p>
          <p><strong>Updated At:</strong> {format(new Date(carData.updatedAt), 'MMMM dd, yyyy hh:mm a')}</p>
        </div>
      )}
    </div>
  );
};

export default AddCar;
