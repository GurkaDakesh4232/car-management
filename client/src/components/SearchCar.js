import React, { useState } from 'react';
import axios from '../api/axios';

function SearchCar() {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`cars/search?keyword=${keyword}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching cars:', error);
    }
  };

  return (
    <div>
      <h2>Search Cars</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map((car) => (
          <div key={car._id}>
            <h3>{car.title}</h3>
            <p>{car.description}</p>
            <button onClick={() => window.location.href = `/car/${car._id}`}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchCar;
