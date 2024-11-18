import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarDetail, updateCar } from '../utils/api'; // Assuming these API functions are defined
import './Home/Updatecar.css';

const UpdateCar = () => {
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    car_type: '',
    company: '',
    dealer: '',
    tags: '',
    images: '',
    createdAt: '',
    updatedAt: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams(); // Get the car id from the URL params
  const navigate = useNavigate();

  // Fetch the car details when the component mounts (or when the id changes)
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarDetail(id);
        setCarData({
          title: data.title || '',
          description: data.description || '',
          car_type: data.car_type || '',
          company: data.company || '',
          dealer: data.dealer || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
          images: Array.isArray(data.images) ? data.images.join(', ') : '',
          createdAt: new Date(data.createdAt).toLocaleString() || '',
          updatedAt: new Date(data.updatedAt).toLocaleString() || '',
        });
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = carData.tags.split(',').map((tag) => tag.trim());
    const imagesArray = carData.images.split(',').map((image) => image.trim());

    const updatedCarDetails = {
      ...carData,
      tags: tagsArray,
      images: imagesArray,
    };

    try {
      setIsSubmitting(true); // Set submitting state to true to disable the form
      await updateCar(id, updatedCarDetails); // Send the updated data to the backend
      navigate('/home'); // Redirect to the home page after successful update
    } catch (error) {
      console.error('Error updating car:', error.message);
      setIsSubmitting(false); // Reset submitting state in case of error
    }
  };

  return (
    <div className="update-car-container">
      <h2>Update Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={carData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Description Input */}
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={carData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Type Input */}
        <div>
          <label>Type</label>
          <input
            type="text"
            name="car_type"
            value={carData.car_type}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Company Input */}
        <div>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={carData.company}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Dealer Input */}
        <div>
          <label>Dealer</label>
          <input
            type="text"
            name="dealer"
            value={carData.dealer}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Tags Input */}
        <div>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={carData.tags}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Images Input */}
        <div>
          <label>Images (comma separated URLs)</label>
          <input
            type="text"
            name="images"
            value={carData.images}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Car'}
        </button>
      </form>

      {/* Display the created and updated timestamps */}
      <div>
        <p><strong>Created At:</strong> {carData.createdAt}</p>
        <p><strong>Updated At:</strong> {carData.updatedAt}</p>
      </div>
    </div>
  );
};

export default UpdateCar;
