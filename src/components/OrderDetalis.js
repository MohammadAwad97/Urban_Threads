import CartCard from "./CartCard";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderDetails({ cartItems }) {
    const navigate = useNavigate();

    // Click to apply and move to the check out page:
    const handleClickCheck = () => {
        console.log("Go to the check out page");
        navigate("/payment");
    }


    // Rendered Items:
    const renderedCartItems = cartItems.map((item) => {
        return( 
            // when you put the fragmant <></>  --> this will fail the key prop
            <CartCard key={item.id} item={item}/>
        );
    })

    // totao price:
    const totalPrice = cartItems.reduce((total, item ) => {
        return Math.ceil(total + item.price * item.quantity)
    }, 0)



    return(
        <main className="flex justify-center items-start bg-[#eff3f6] p-6 h-[100vh] gap-9">
            <div id="left_part" className="w-[60%]">
                <div className="mb-6">
                    <h2 className="flex text-2xl font-semibold text-green-600 pb-3">Thank you for your order form urban threads</h2>
                    <h2 className="flex text-2xl font-semibold">Orders Details</h2>
                    <p><span className="font-semibold">{cartItems.length} items</span> in your bag.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="grid grid-cols-6 gap-4 font-bold pb-6">
                        <p className="col-span-3">Product</p>
                        <p className="text-center">Price</p>
                        <p className="text-center">Quantity</p>
                        <p className="text-center">Total Price</p>
                    </div>
                    {cartItems.length > 0 ? renderedCartItems : <h2 className="text-center w-full font-semibold py-10 text-lg text-[#674b81]">No Cart Items</h2>}
                </div>
            </div>
            <div id="right_part" className="rounded-2xl bg-white w-[30%] shadow-xl">
                <div className="p-6">
                    <div className="bg-[#9c73c1] p-3 rounded">
                    <h2 className="flex text-lg font-semibold">Cart Total</h2>
                    <div className="mt-5">
                        <p className="flex justify-between items-center text-[0.9em] font-normal font-serif text-white">
                            Cart Subtotal
                            <p>{totalPrice}</p>
                        </p>
                        <p className="flex justify-between items-center text-[0.9em] font-normal font-serif text-white">
                            Discount
                        <p className="text-[#000]">-4%</p>
                        </p>
                        <p className="flex justify-between items-center text-[0.9em] font-normal font-serif text-white">
                            Cart Total
                            <p>{totalPrice - totalPrice * 4/100}</p>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderDetails;