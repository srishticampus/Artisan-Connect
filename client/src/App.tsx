import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/Landing/LandingPage.jsx"
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProductDetail from './components/products/ProductDetail';
import ProductList from './components/products/ProductList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/w' element={<LoginForm/>} />
      <Route path='/e' element={<RegisterForm/>} />
      <Route path='/r' element={<ProductDetail/>} />
      <Route path='/e' element={<ProductList/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;