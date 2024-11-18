import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/Home/Home';
import UpdateCar from './components/UpdateCar';
import { AuthProvider } from './context/AuthContext';
import HomeScreen1 from './components/HomeScreen';
import CarsList from './components/CarList';
import AddCar from './components/AddCar';
import Navbar from './components/navbar';
import RegistrationSuccess from './components/Registrationsuccess';
import Login from './components/Login';
import Footer from './components/Footer';




function App() {
  return (
    <Router>
      <Navbar/>
      <AuthProvider>
        <Routes>
        
          <Route path="/update/:id" element={<UpdateCar />} />
          <Route path="/" element={<HomeScreen1 />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/update-car/:id" element={<UpdateCar />} />
          <Route path="/register" element={<RegistrationSuccess />} />
          <Route path="/login" element={<Login/>} />
          




          {/* Add other routes here */}
        </Routes>
        <Footer/>
      </AuthProvider>
      
    </Router>
  );
}

export default App;
