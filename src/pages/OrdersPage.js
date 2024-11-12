import OrderDetails from "../components/OrderDetalis";
import { useEffect, useContext } from "react";
import { cartContext } from "../context/CartContext";

function OrderPage() {

    const { cartItems, fetchCartItems } = useContext(cartContext);

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <OrderDetails cartItems={cartItems}/>
    )
};

export default OrderPage;