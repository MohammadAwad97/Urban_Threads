import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import PageNotFound from "./pages/PageNotFound";
import { useContext, useEffect, useId, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/CartContext";
import { cartContext } from "./context/CartContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // let userId = sessionStorage.getItem("userId");

  // useEffect(() => {
  //     if(userId) {
  //         setIsLoggedIn(true);
  //     }
  // }, []);

  // Pass it to logIn and the header
  const toggelLogged = () => {
    setIsLoggedIn((current) => !current);
  };

  // بدنا لما يتحمل الاب كله نطبق الفيتش تبع الكارت

  return (
    <Routes>
      {/* تذكر انو كل راوت راح يشيك على الكرنت باث , لو كان نفس الباث راح يرجع الابن , و غيرها راح يرجع نل */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage onChange={toggelLogged} />} />
      <Route path="/signup" element={<SignupPage onChange={toggelLogged} />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CartProvider>
              <CartPage />
            </CartProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <OrderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
