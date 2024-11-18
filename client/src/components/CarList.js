import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCars, deleteCar } from '../utils/api';
import '../../src/App.css';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error.message);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-car/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error.message);
    }
  };

  // Function to handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter cars based on search query
  const filteredCars = cars.filter(car => 
    car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.dealer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="cars-list-container">
      <h2 className="cars-list-title">Cars List</h2>

      {/* Search bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <button onClick={() => navigate('/add-car')} className="add-car-button">
        Add New Car
      </button>

      {filteredCars.length === 0 ? (
        <p className="no-cars-message">No cars available. Add some cars to see the list.</p>
      ) : (
        <div className="cars-container">
          {filteredCars.map((car) => (
            <div key={car._id} className="car-card">
              <h3 className="car-title">{car.title}</h3>
              <p className="car-description">{car.description}</p>
              <p><strong>Type:</strong> {car.car_type}</p>
              <p><strong>Company:</strong> {car.company}</p>
              <p><strong>Dealer:</strong> {car.dealer}</p>
              <p><strong>Tags:</strong> {car.tags.join(', ')}</p>
              <div className="car-image-container">
                {car.images && car.images.length > 0 ? (
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="car-image"
                  />
                ) : (
                  <p className="no-image-message">No images available</p>
                )}
              </div>
              <p><strong>Created At:</strong> {new Date(car.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(car.updatedAt).toLocaleString()}</p>

              <div className="buttons-container">
                <button 
                  className="update-button"
                  onClick={() => handleUpdate(car._id)}
                >
                  Update
                </button>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsList;
