import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to the Car Management System</h2>
      <Link to="/cars">View Cars</Link>
    </div>
  );
}

export default Home;
