import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetail } from '../../src/utils/api';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const res = await getCarDetail(id);
        setCar(res.data);
      } catch (err) {
        console.error('Failed to fetch car details:', err);
      }
    };
    fetchCarDetail();
  }, [id]);

  return car ? (
    <div>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>{car.tags}</p>
      <div>
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={`Car Image ${index}`} />
        ))}
      </div>
    </div>
  ) : (
    <p>Loading car details...</p>
  );
}

export default CarDetail;
