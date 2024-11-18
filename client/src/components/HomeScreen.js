import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div 
      style={{ 
        textAlign: 'center', 
        fontFamily: 'fantasy', 
        marginTop: '0px',
        height: '100vh', // Full height of the viewport to avoid scrolling
        display: 'flex', // Flexbox to center content vertically
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center', // Center elements vertically
        alignItems: 'center', // Center elements horizontally
        padding: '10px' // Padding to avoid content being too close to edges
      }}
    >
      <h1>Welcome to Car Management</h1>

      {/* Add a description below the heading */}
      <p style={{ 
        fontSize: '18px', 
        color: '#555', 
        fontFamily: 'monospace', 
        marginBottom: '0px', // Space between description and image
        textAlign: 'center' // Center-align text
      }}>
      
        
      </p>

      {/* Add the image below the description */}
      <img 
        src={'/cars.png'} // Replace with your image URL or path
        alt="Car Management"
        style={{
          width: '600px', // Fixed width
          height: 'auto', // Auto-adjust height to maintain aspect ratio
          maxHeight: '500px', // Max height to avoid overflowing
          marginBottom: '10px', // Space between image and button
        }}
      />

      {/* View Cars button with pink border */}
      <button
        onClick={() => navigate('/cars')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          border: '2px solid pink', // Pink border color
          backgroundColor: 'white', // White background
          color: '#333', // Dark text color
          borderRadius: '5px', // Rounded corners
          transition: 'all 0.3s ease', // Smooth transition for hover effect
          marginTop: '0px',
          marginBottom:'0px' // Space between image and button
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = 'pink'} // Change background color on hover
        onMouseOut={(e) => e.target.style.backgroundColor = 'white'} // Reset background color
      >
        View Cars
      </button>
    </div>
  );
};

export default HomeScreen;
