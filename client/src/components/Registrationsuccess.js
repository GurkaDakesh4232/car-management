import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Check Circle icon from react-icons
import '../components/Registrationsuccess.css';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  // Navigate to login page or home page after a few seconds (optional)
  setTimeout(() => {
    navigate('/login'); // You can redirect to the login page or wherever you need
  }, 5000);

  return (
    <div className="registration-success-container">
      <div className="success-message">
        <FaCheckCircle className="success-icon" />
        <h2>Registration Successful</h2>
      </div>

      <div className="description">
        <p>Your account has been created successfully. You can now log in and start exploring!</p>
        <p>Thank you for joining us!</p>
      </div>

      <div className="action-links">
        <p>Redirecting to login page...</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
