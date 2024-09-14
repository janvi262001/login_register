import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegistration from './Pages/CustomerRegistration';
import AdminRegistration from './Pages/AdminRegistration';
import AdminLogin from './Pages/AdminLogin';
import LandingPage from './Pages/LandingPage';
import VerifyEmail from './Pages/VerifyToken';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<Dashboard/>} />
        <Route path="/register-customer" element={<CustomerRegistration />} />
        <Route path="/register-admin" element={<AdminRegistration/>} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
