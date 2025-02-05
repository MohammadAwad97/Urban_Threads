import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './context/CartContext';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);
root.render(
    <BrowserRouter>
    <CartProvider>
    <App/>
    </CartProvider>
    </BrowserRouter>
);

