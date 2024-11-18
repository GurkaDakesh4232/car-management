import React from 'react';
import ReactDOM from 'react-dom/client';  // Update to import 'react-dom/client'
import App from './App';
import './index.css';

// Create the root element using createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using root.render() instead of ReactDOM.render()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
