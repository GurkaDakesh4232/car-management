import React from 'react';
import '../components/navbr.css';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Right Side: Logo */}
      <div style={styles.logoContainer}>
        <img 
          src="./car.png" 
          alt="Logo" 
          style={styles.logo}
        />
      </div>

      {/* Middle: Heading */}
      <div style={styles.heading}>
        <h1 style={styles.title}>Car Management</h1>
      </div>

      {/* Left Side: Register & Login */}
      <div style={styles.authLinks}>
        <a href="/register" style={styles.link}>Register</a>
        <a href="/login" style={styles.link}>Login</a>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C71585', // Dark Pink
    padding: '10px 20px',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    flexWrap: 'wrap', // Allows items to wrap on smaller screens
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
    borderRadius: '50%',
  },
  heading: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  authLinks: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Navbar;
