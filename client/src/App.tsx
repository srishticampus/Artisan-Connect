import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/Landing/LandingPage"
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProductDetail from './components/products/ProductDetail';
import ProductList from './components/products/ProductList';
import UserHome from "./components/home/UserHome"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/user/login' element={<LoginForm/>} />
      <Route path='/user/register' element={<RegisterForm/>} />
      <Route path='/user/homepage' element={<UserHome/>} />
      <Route path='/user/viewproductlist' element={<ProductDetail/>} />
      <Route path='/user/viewproductdetails/:productid' element={<ProductList/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;