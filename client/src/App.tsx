import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/Landing/LandingPage"
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProductDetail from './components/products/ProductDetail';
import ProductList from './components/products/ProductList';
import UserHome from "./components/home/UserHome"
import AdminDashboard from './components/admin/AdminDashboard';
import ArtisanLogin from "./components/auth/ArtisansLogin";
import ArtisanRegister from "./components/auth/ArtisansRegistration";
import DeliveryAgentLogin from './components/auth/DeliveryAgentLogin';
import DeliveryAgentRegistration from './components/auth/DeliveryAgentRegistration';
import ContactPage from './components/Landing/ContactPage';
import AboutPage from './components/Landing/AboutPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
{/* landing */}
      <Route path='/' element={<LandingPage/>} />
      <Route path='/about' element={<AboutPage/>} />
      <Route path='/contact' element={<ContactPage/>} />

{/* buyer */}
      <Route path='/buyer/login' element={<LoginForm/>} />
      <Route path='/buyer/register' element={<RegisterForm/>} />
      <Route path='/buyer/homepage' element={<UserHome/>} />
      <Route path='/buyer/viewproductlist' element={<ProductList/>} />
      <Route path='/buyer/viewproductdetails/:productid' element={<ProductDetail/>} />

{/* artisan */}
      <Route path='/artisan/login' element={<ArtisanLogin/>} />
      <Route path='/artisan/register' element={<ArtisanRegister/>} />

{/* delivery agent */}
      <Route path='/deliveryagent/login' element={<DeliveryAgentLogin/>} />
      <Route path='/deliveryagent/register' element={<DeliveryAgentRegistration/>} />

{/* admin */}
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;