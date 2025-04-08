import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/Landing/LandingPage"
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProductDetail from './components/products/ProductDetail';
import ProductList from './components/products/ProductList';
import UserHome from "./components/home/UserHome"
import AdminDashboard from './components/admin/AdminDashboard';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/buyer/login' element={<LoginForm/>} />
      <Route path='/buyer/register' element={<RegisterForm/>} />
      <Route path='/buyer/homepage' element={<UserHome/>} />
      <Route path='/buyer/viewproductlist' element={<ProductList/>} />
      <Route path='/buyer/viewproductdetails/:productid' element={<ProductDetail/>} />


      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;