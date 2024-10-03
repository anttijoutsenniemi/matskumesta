import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import BuyerHomePage from './pages/BuyerHomePage';
import SellerHomePage from './pages/SellerHomePage';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import useStore from './stores/useStore';
import AddProductsPage from './pages/AddProductsPage';
import ConfirmProductsPage from './pages/ConfirmProductsPage';
import FindProductsPage from './pages/FindProductsPage';
import BuyerFoundProductsPage from './pages/BuyerFoundProductsPage';

const App: React.FC = () => {
  const { isSeller, setIsSeller } = useStore();

  return (
    <Router>
      <MainLayout>
        <Routes>
          {/*Public routes*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/*Protected routes*/}
          {
            (isSeller)
            ? 
            <>
              <Route path="/home" element={<ProtectedRoute><SellerHomePage /></ProtectedRoute>} />
              <Route path="/addproducts" element={<ProtectedRoute><AddProductsPage /></ProtectedRoute>} />
              <Route path="/confirmproducts" element={<ProtectedRoute><ConfirmProductsPage /></ProtectedRoute>} />
            </>
            : 
            <>
              <Route path="/home" element={<ProtectedRoute><BuyerHomePage /></ProtectedRoute>} />
              <Route path="/findproducts" element={<ProtectedRoute><FindProductsPage /></ProtectedRoute>} />
              <Route path="/buyerfoundproducts" element={<ProtectedRoute><BuyerFoundProductsPage/></ProtectedRoute>} />
            </>
          }
          
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
