import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa'; // User icon from react-icons
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Track login success
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mocking API call for login (replace this with actual API)
      // If the login is successful, set loginSuccess to true
      // In a real scenario, you would use an API function like loginUser(formData)
      setTimeout(() => {
        setLoginSuccess(true);
        setIsSubmitting(false);
        setTimeout(() => {
          navigate('/'); // Redirect to home after 3 seconds
        }, 3000);
      }, 1000); // Mock delay for login API
    } catch (error) {
      console.error('Login failed:', error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {!loginSuccess ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </>
      ) : (
        <div className="login-success">
          <div className="success-message">
            <FaUserCheck className="success-icon" />
            <h2>Login Successful</h2>
          </div>

          <div className="description">
            <p>Welcome back! You have logged in successfully.</p>
            <p>Redirecting to the homepage...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
