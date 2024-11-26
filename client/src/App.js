import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Resume from "./views/Resume";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Header from "./views/Header";
import ECommerceHome from './apps/eCommerce_App/views/Main/Home.js';
import BrowseProducts from './apps/eCommerce_App/views/Main/Browse.js';
import Cart from './apps/eCommerce_App/views/Main/Cart.js';
import Checkout from './apps/eCommerce_App/views/Main/Checkout.js';
import Account from './apps/eCommerce_App/views/Main/Account.js';
import ProductExample from './apps/eCommerce_App/views/Main/ProductPage.js';
import AdminPanel from './apps/eCommerce_App/views/Admin/AdminPanel.js';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <div className="App">
          <Header />
          <Routes>
              <Route path="/">
                <Route index element={<Home />} />
              </Route>
              <Route path="home">
                <Route index element={<Home />} />
              </Route>
              <Route path="resume">
                <Route index element={<Resume />} />
              </Route>
              <Route path="login">
                <Route index element={<Login />} />
              </Route>
              <Route path="signup">
                <Route index element={<Signup />} />
              </Route>
              <Route path="/ecommerce/home">
                <Route index element={ <ECommerceHome/> } />
              </Route>
              <Route path="/ecommerce/browse">
                <Route index element={ <BrowseProducts/> } />
              </Route>
              <Route path='/ecommerce/cart'>
                <Route index element={ <Cart /> } />
              </Route>
              <Route path="/ecommerce/checkout">
                <Route index element={ <Checkout /> } />
              </Route>
              <Route path="/ecommerce/account">
                <Route index element={ <Account /> } />
              </Route>
              <Route path="/ecommerce/productpage">
                <Route index element={ <ProductExample /> } />
              </Route>
              <Route path="/ecommerce/adminpanel">
                <Route index element={ <AdminPanel /> } />
              </Route>
            </Routes>
        <footer className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>Copyright © Mike L. Haddon II. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;
