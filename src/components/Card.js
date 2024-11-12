import { GoStarFill } from "react-icons/go";
import Button from "./Button";
import { cartContext } from "../context/CartContext";
import { useContext } from "react";

function Card({ product }) {
  const { handleAddToCart } = useContext(cartContext);

  const handleClick = () => {
    handleAddToCart(product);
  };

  return (
    <div className="flex flex-col justify-between w-[23%] min-h-[400px] rounded gap-1 mb-4 flex-wrap">
      <div className="w-full rounded">
        <img
          className="w-full h-full rounded-2xl"
          src={product.image_url}
          alt="#imag"
        />
      </div>
      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <div className="flex justify-start items-center gap-1">
          <GoStarFill className="flex text-[#a067d1]" />
          {product.rating}
        </div>
      </div>
      <div>{product.price}</div>
      <div>
        <Button
          onClick={handleClick}
          primary
          rounded
          className="shadow-2xl shadow-purple-800 py-[4px] w-[100%]"
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default Card;
