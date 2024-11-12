import { useContext } from "react";
import { cartContext } from "../context/CartContext";
import { GoTrash } from "react-icons/go";
import { GoDash } from "react-icons/go";
import Button from "./Button";

function CartCard({ item }) {
  const { handleAddToCart, handleDeleteFromCart, handleDeleteItem } =
    useContext(cartContext);
  const { name, image_url, price, category, quantity } = item;

  const handleIncrease = () => {
    handleAddToCart(item);
  };

  const handleDelete = () => {
    handleDeleteFromCart(item);
  };

  return (
    <div className="grid grid-cols-6 gap-4 pb-6">
      <div className="col-span-3 flex justify-start items-start gap-6">
        <div className="w-[130px] h-[150px] rounded-md">
          <img
            className="w-full h-full rounded-lg border"
            src={image_url}
            alt="image_url"
          />
        </div>
        <div className="pt-6 w-[30%]">
          <p className="text-gray-400">{category}</p>
          <p className="font-semibold">{name}</p>
          <div
            onClick={() => handleDeleteItem(item)}
            id="delete_item"
            className="w-full mt-2"
          >
            <Button className="w-[80%] bg-white border border-[#d16868] hover:bg-[#ff0d0d] hover:translate-y-[2px] hover:translate-x-[2px] text-[#ff2c2c] text-lg hover:text-white flex justify-center items-center py-[5px] transition ease-in-out delay-150 rounded-[4px]">
              <GoTrash className="text-base" />
            </Button>
          </div>
        </div>
      </div>
      <p className="flex justify-center items-center font-semibold">
        {price} JD
      </p>

      <div className="flex justify-center items-center gap-4 borderw-full">
        <button
          onClick={handleDelete}
          className="border-[1px] border-[#674b81] rounded w-[20%] h-[20%] flex justify-center items-center"
        >
          -
        </button>
        <p className="font-semibold">{quantity}</p>
        <button
          onClick={handleIncrease}
          className="border-[1px] border-[#674b81] rounded w-[20%] h-[20%] flex justify-center items-center"
        >
          +
        </button>
      </div>
      <p className="flex justify-center items-center font-semibold text-[#674b81]">
        {Math.ceil(price * quantity)} JD
      </p>
    </div>
  );
}

export default CartCard;
