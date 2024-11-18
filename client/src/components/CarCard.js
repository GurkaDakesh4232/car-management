import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="card shadow-sm mb-4">
      <img
        src={car.images[0] || 'https://via.placeholder.com/150'} // Fallback image if none exists
        className="card-img-top"
        alt={car.title}
      />
      <div className="card-body">
        <h5 className="card-title">{car.title}</h5>
        <p className="card-text">{car.description}</p>
        <div className="tags">
          {car.tags.map((tag, index) => (
            <span key={index} className="badge bg-primary me-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
