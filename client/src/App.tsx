import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProductDetail from "./components/products/ProductDetail";
import ProductList from "./components/products/ProductList";
import UserHome from "./components/home/UserHome";
import AdminDashboard from "./components/admin/AdminDashboard";
import ArtisanLogin from "./components/auth/ArtisansLogin";
import ArtisanRegister from "./components/auth/ArtisansRegistration";
import DeliveryAgentLogin from "./components/auth/DeliveryAgentLogin";
import DeliveryAgentRegistration from "./components/auth/DeliveryAgentRegistration";
import ContactPage from "./components/Landing/ContactPage";
import AboutPage from "./components/Landing/AboutPage";
import AdminLogin from "./components/auth/AdminLogin";
import BuyerProfile from "./components/Buyer/BuyerProfile";
import BuyerForgotpswd from "./components/Buyer/BuyerForgotpswd";
import Artisanforget from "./components/Artisan/Artisanforget";
import Deliveryforget from "./components/DeliveryAgent/Deliveryforget";
import DeliveryAgentHome from "./components/DeliveryAgent/DeliveryAgentHome";
import ArtisanHome from "./components/Artisan/ArtisanHome";
import ArtrisanProfile from "./components/Artisan/ArtrisanProfile";
import Deliveryprofile from "./components/DeliveryAgent/Deliveryprofile";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminViewArtists from "./components/admin/AdminViewArtists";
import AdminViewAgents from "./components/admin/AdminViewAgents";
import AdminViewArtistIndividual from "./components/admin/AdminViewArtistIndividual";
import AdminViewUserIndividual from "./components/admin/AdminViewUserIndividual";
import AdminViewAgentRequest from "./components/admin/AdminViewAgentRequest";
import AdminViewRequestedAgent from "./components/admin/AdminViewRequestedAgent";
import AdminViewDeliveryAgentIndividual from "./components/admin/AdminViewDeliveryAgentIndividual";
import Cart from "./components/Cart/Cart";
import NotificationMain from "./components/Notification/NotificationMain";
import Gallery from "./components/Gallery/Gallery";
import Notification from "./components/Notification/Notification";
import Checkout from "./components/Cart/Checkout";
import OrderConfirm from "./components/Cart/OrderConfirm";
import ViewArtists from "./components/Buyer/BuyeriewArtists";
import IndividualArtistWorks from "./components/Buyer/IndividualArtistWorks";
import UserOrders from "./components/Orders/UserOrders";
import ViewSingleWork from "./components/Buyer/ViewSingleWork";
import Payment from "./components/Orders/Payment";
import TrackOrder from "./components/Orders/TrackOrder";
import ArtistWorks from "./components/Artisan/ArtistWorks";
import ArtistOrdrers from "./components/Orders/ArtistOrders";
import ArtistChat from "./components/Chat/ArtitsChat";
import Editwork from "./components/Artisan/Editwork";
import DeliveryRoutes from "./components/DeliveryAgent/DeliveryRoutes";
import DeliveryJobs from "./components/DeliveryAgent/DeliveryJobs";
import BuyerChat from "./components/Chat/BuyerChat";
import AdminViewOders from "./components/Orders/AdminViewOders";
import Addminvieworders from "./components/admin/Addminvieworders";
import AdminProductview from "./components/admin/AdminProductview";
import BuyerAddComplaint from "./components/Complaints/BuyerAddComplaint";
import ArtisanAddComplaint from "./components/Complaints/ArtisanAddComplaint";
import ViewBuyerComplaints from "./components/Complaints/ViewBuyerComplaints";
import ViewArtisanComplaints from "./components/Complaints/ViewArtisanComplaints";
import AdminViewComplaints from "./components/Complaints/AdminViewComplaints";
import FavoriteList from "./components/Buyer/FavoriteList";
import ChatBot from "./components/chatbot/ChatBot";

// #5046f4
function App() {
  const imageBaseUrl = "http://localhost:4004";

  return (
    <BrowserRouter>
      <Routes>
        {/* landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* buyer */}
        <Route path="/buyer/login" element={<LoginForm />} />
        <Route path="/buyer/register" element={<RegisterForm />} />
        <Route path="/buyer/homepage" element={<UserHome />} />
        <Route
          path="/buyer/profile"
          element={<BuyerProfile url={imageBaseUrl} />}
        />
        <Route path="/buyer/viewproductlist" element={<ProductList />} />
        <Route path="/buyer/trackorder" element={<TrackOrder url={imageBaseUrl} />} />
        <Route path="/buyer/forgetpassword" element={<BuyerForgotpswd />} />
        <Route path="/buyer_chat/:artisanId/:productId" element={<BuyerChat />} />
        <Route
          path="/buyer/viewproductdetails/:productid"
          element={<ProductDetail />}
        />
        <Route path="/user_cart" element={<Cart url={imageBaseUrl} />} />

        <Route path="/user_notification" element={<NotificationMain />} />

        <Route path="/user_messages" element={<Notification />} />
        <Route path="/gallery" element={<Gallery url={imageBaseUrl} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order_confirmed" element={<OrderConfirm />} />
        <Route path="/view_artists" element={<ViewArtists url={imageBaseUrl} />} />
        <Route
          path="/view_artistworks/:id"
          element={<IndividualArtistWorks url={imageBaseUrl} />}
        />
        <Route path="/view_orders" element={<UserOrders url={imageBaseUrl} />} />
        <Route
          path="/viewsinglework_art/:id"
          element={<ViewSingleWork url={imageBaseUrl} />}
        />
        <Route path="/payment/:id" element={<Payment url={imageBaseUrl} />} />

        {/* artisan */}
        <Route path="/artisan/login" element={<ArtisanLogin />} />
        <Route path="/artisan/register" element={<ArtisanRegister />} />
        <Route path="/artisan/forgetpassword" element={<Artisanforget />} />
        <Route path="/artisan/works" element={<ArtistWorks url={imageBaseUrl} />} />
        <Route path="/artisan/order" element={<ArtistOrdrers url={imageBaseUrl} />} />
        <Route path="/artisan/chat" element={<ArtistChat />} />
        <Route path="/artisan/homepage" element={<ArtisanHome />} />
        <Route path="/artist_editprofile/:id" element={<Editwork url={imageBaseUrl} />} />

        <Route
          path="/artisan/profile"
          element={<ArtrisanProfile url={imageBaseUrl} />}
        />

        {/* delivery agent */}
        <Route path="/deliveryagent/login" element={<DeliveryAgentLogin />} />
        <Route
          path="/deliveryagent/register"
          element={<DeliveryAgentRegistration />}
        />
        <Route
          path="/deliveryagent/forgetpassword"
          element={<Deliveryforget />}
        />
        <Route path="/deliveryagent/homepage" element={<DeliveryAgentHome />} />
        <Route path="/delivery_agent_routes" element={<DeliveryRoutes />} />
        <Route path="/delivery_agent_jobs" element={<DeliveryJobs />} />

        <Route
          path="/deliveryagent/profile"
          element={<Deliveryprofile url={imageBaseUrl} />}
        />
        {/* admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/homepage" element={<AdminDashboard />} />
        <Route path="/admin/viewuser" element={<AdminViewUsers />} />
        <Route path="/admin/viewartist" element={<AdminViewArtists />} />
        <Route path="/admin/viewagent" element={<AdminViewAgents />} />
        <Route
          path="/admin_viewartistindividual/:id"
          element={<AdminViewArtistIndividual url={imageBaseUrl} />}
        />
        <Route
          path="/admin_viewuserindividual/:id"
          element={<AdminViewUserIndividual url={imageBaseUrl} />}
        />

        <Route
          path="admin_viewagentrequests"
          element={<AdminViewAgentRequest />}
        />
        <Route
          path="/admin_viewrequestedagentdetails/:id"
          element={<AdminViewRequestedAgent url={imageBaseUrl} />}
        />

        <Route
          path="/admin_viewdeliveryagentindividua/:id"
          element={<AdminViewDeliveryAgentIndividual url={imageBaseUrl} />}
        />
        <Route
          path="/admin/orders"
          element={<Addminvieworders url={imageBaseUrl} />}
        />
        <Route
          path="/admin/products"
          element={<AdminProductview url={imageBaseUrl} />}
        />

        <Route
          path="/buyer/addComplaint"
          element={<BuyerAddComplaint url={imageBaseUrl} />}
        />
        <Route
          path="/artisan/addComplaint/"
          element={<ArtisanAddComplaint url={imageBaseUrl} />}
        />
        <Route
          path="/buyer/viewComplaint"
          element={<ViewBuyerComplaints url={imageBaseUrl} />}
        />
        <Route
          path="/artisan/viewComplaint/"
          element={<ViewArtisanComplaints url={imageBaseUrl} />}
        />
        <Route
          path="/admin/viewComplaints/"
          element={<AdminViewComplaints url={imageBaseUrl} />}
        />
        <Route
          path="/buyer/viewfavorites/"
          element={<FavoriteList url={imageBaseUrl} />}
        />
        <Route path="/chatbot" element={<ChatBot />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
