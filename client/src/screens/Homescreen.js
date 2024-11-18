import React, { useEffect, useState } from 'react';

function Homescreen() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/cars/get')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setCars(data); // Assuming the response contains an array of cars
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Cars</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {cars.length === 0 && !error ? (
        <p className="text-center">Loading cars...</p>
      ) : (
        <div className="row">
          {cars.map((car, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                {car.images && car.images.length > 0 && (
                  <img
                    src={car.images[0]}
                    className="card-img-top"
                    alt={car.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{car.title}</h5>
                  <p className="card-text">{car.description}</p>
                  <a href="#!" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Homescreen;
