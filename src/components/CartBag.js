import CartCard from "./CartCard";
import Button from "./Button";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../context/CartContext";
import Modal from "../components/Modal";

function CartBag({ cartItems }) {
  const navigate = useNavigate();
  const { handleDeleteItemsCart } = useContext(cartContext);
  const [flag, setFlag] = useState(false);

  // لو حطينا القسم اليمن في كومبوننت لحاله كان حطينا الستيت هاي في الاب
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isValid, setIsValid] = useState("");

  // Click on the coupon:
  const handleClickCoupon = async (e) => {
    console.log(e.key);
    if (coupon) {
      const { data } = await axios.get(
        `http://localhost:3001/coupons?lable=${coupon}`
      );
      if (data.length > 0) {
        setDiscount(data[0].discount);
        setIsValid("");
      } else {
        setIsValid("Wrong coupon code");
        setDiscount(0);
      }
    } else {
      setIsValid("Please enter a coupon code");
      setDiscount(0);
    }
  };

  // totao price:
  const totalPrice = cartItems.reduce((total, item) => {
    return Math.ceil(total + item.price * item.quantity);
  }, 0);

  // Click to apply and move to the check out page:
  const handleClickCheck = () => {
    totalPrice > 0 ? navigate("/payment") : console.log("No items in the cart");
  };

  // Rendered Items:
  const renderedCartItems = cartItems.map((item) => {
    return (
      // when you put the fragmant <></>  --> this will fail the key prop
      <CartCard key={item.id} item={item} />
    );
  });

  // handle Coupon:
  const handleChange = (e) => {
    setCoupon(e.target.value);
  };

  const emptyCartImage = (
    <div className="w-full h-[200px] flex justify-center items-center flex-col">
      <img
        className="w-[200px] h-full"
        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4344468-3613896.png?f=webp"
        alt="emptyCart"
      />
    </div>
  );

  return (
    <main className="flex justify-center items-start bg-[#eff3f6] p-6 h-full gap-9">
      <div id="left_part" className="w-[60%]">
        <div className="w-full flex justify-between items-center">
          <div className="mb-6">
            <h2 className="flex text-2xl font-semibold">Shopping Bag</h2>
            <p>
              <span className="font-semibold">{cartItems.length} items</span> in
              your bag.
            </p>
          </div>
          <div>
            <div onClick={() => handleDeleteItemsCart()} className="w-full">
              <Button className="border border-[#d16868] hover:bg-[#ff0d0d] hover:translate-y-[2px] hover:translate-x-[2px] text-[#ff2c2c] hover:text-white flex justify-center items-center py-[5px] transition ease-in-out delay-150 rounded-[4px] shadow-xl bg-[#eff3f6] text-base font-medium">
                Delete All
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-6 gap-4 font-bold pb-6">
            <p className="col-span-3">Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Total Price</p>
          </div>
          {cartItems.length > 0 ? renderedCartItems : emptyCartImage}
        </div>
      </div>
      <div id="right_part" className="rounded-2xl bg-white w-[30%] shadow-xl">
        <div className="p-6">
          <h2 className="flex text-lg font-semibold">Coupon Code</h2>
          <p className="text-sm text-[#dbdbdd] mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            elementum sodales elit, et hendrerit justo rhoncus vitae. In ut
            magna est.
          </p>
          <input
            value={coupon}
            onChange={handleChange}
            placeholder="Coupon Code"
            className="w-full border-[#b8a0cc] border outline-none mt-5 rounded px-3 py-2"
          />
          {isValid && (
            <p className="text-sm text-red-700 font-medium mt-[1px]">
              ! {isValid}
            </p>
          )}
          <div className="w-full mt-5">
            <Button
              onClick={handleClickCoupon}
              rounded
              primary
              className="w-full"
            >
              Apply
            </Button>
          </div>
          <hr className=" bg-[#585656] w-full my-5 h-[2px]" />
          <div className="bg-[#9c73c1] p-3 rounded">
            <h2 className="flex text-lg font-semibold">Cart Total</h2>
            <div className="mt-5">
              <p className="flex justify-between items-center text-[0.9em] font-normal font-serif text-white">
                Cart Subtotal
                <p>{totalPrice}</p>
              </p>
              <p className="flex justify-between items-center text-[0.9em] font-normal font-serif text-white">
                Discount
                <p className="text-[#000]">-{discount}%</p>
              </p>
              <p className="flex justify-between items-center text-[0.9em] font-normal font-serif text-white">
                Cart Total
                <p>{totalPrice - (totalPrice * discount) / 100}</p>
              </p>
              <div className="w-full mt-5">
                <Button
                  onClick={handleClickCheck}
                  rounded
                  className="w-full bg-white font-semibold"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {flag && <Modal></Modal>}
    </main>
  );
}

export default CartBag;
