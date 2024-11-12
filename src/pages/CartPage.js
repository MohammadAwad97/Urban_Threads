import { useEffect, useContext } from "react";
import { cartContext } from "../context/CartContext";
import CartBag from "../components/CartBag";



function CartPage() {
    // هون لازم تكون الستيت الرئيسية تبعت عناصر الكارت بس نقلناها على البروفايدر
    const { cartItems, fetchCartItems } = useContext(cartContext);

    useEffect(() => {
        fetchCartItems();
    }, []);


    return(
            <CartBag cartItems={cartItems}/>
    )
};

export default CartPage;