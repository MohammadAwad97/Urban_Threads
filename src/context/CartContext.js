import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const cartContext = createContext();

function CartProvider({ children }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState("");

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch the first cart items for the user loggedIn:
  const fetchCartItems = async () => {
    try {
      // there is no userId >> Will response with no cart >> لكن الاصل انو صفحة الكارد ما رح تفتح من غير لوج ان فراح يكون في اي دي خاوة
      if (userId) {
        const { data: cart } = await axios.get(
          `http://localhost:3001/carts?userId=${userId}`
        );
        setCartItems(cart[0].cart);
        setCartId(cart[0].id); // الحركة هاي راجح تسهل علينا كثير عشان نقدر نعدل من خلال الباتش
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add Product to the cart:
  const handleAddToCart = async (product) => {
    try {
      let newArr;
      // if no userId:
      if (!userId) return navigate("login");

      // Check if the product is in the cart:
      const foundedProduct = cartItems.find((item) => {
        return item.id === product.id;
      });

      // Is found:
      if (foundedProduct) {
        newArr = cartItems.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }

      // Nort found:
      if (!foundedProduct) {
        newArr = [...cartItems, product];
      }

      // Now patch or modify the arr in the server:
      const { data } = await axios.patch(
        `http://localhost:3001/carts/${cartId}`,
        {
          cart: newArr,
        }
      );

      // Now modify the state from the respons or form the newArr;
      setCartItems(data.cart);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Product from the cart:
  const handleDeleteFromCart = async (product) => {
    const { id, quantity } = product;
    try {
      let newArr;
      // if the quantity more than 0:
      if (quantity > 1) {
        newArr = cartItems.map((item) => {
          return item.id === id ? { ...item, quantity: quantity - 1 } : item;
        });

        const { data } = await axios.patch(
          `http://localhost:3001/carts/${cartId}`,
          {
            cart: newArr,
          }
        );
        setCartItems(data.cart); // This is the critical line that show the new content on the screen.

        // if the quantity === 1:
      } else if (quantity === 1) {
        newArr = cartItems.filter((item) => {
          return item.id !== id;
        });

        console.log(newArr);

        const { data } = await axios.patch(
          `http://localhost:3001/carts/${cartId}`,
          {
            cart: newArr,
          }
        );
        setCartItems(data.cart);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete the all item:
  const handleDeleteItem = async (product) => {
    const updatedArr = cartItems.filter((item) => {
      return item.id !== product.id;
    });

    await axios.patch(`http://localhost:3001/carts/${cartId}`, {
      cart: updatedArr,
    });

    setCartItems(updatedArr);
  };

  // Delete all the cart items:
  const handleDeleteItemsCart = async () => {
    await axios.patch(`http://localhost:3001/carts/${cartId}`, {
      cart: [],
    });

    setCartItems([]);
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        fetchCartItems,
        handleAddToCart,
        handleDeleteFromCart,
        handleDeleteItem,
        handleDeleteItemsCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export { cartContext };
export default CartProvider;

/*
        try {
            let updatedArr;
            // If no userId > return to the login page:
            if(!userId) return navigate("/login");

            // Check if the product is already exists:
            const isFound = cartItems.find((item) => {
                return product.id === item.id
            });

            if(isFound) {
                // increase the quantity of this one:
                updatedArr = cartItems.map((item) => {
                    return item.id === product.id? { ...item, quantity: item.quantity + 1 } 
                    : item
                });
                
                return;
            }
            // If the product not found add it to the cart:
            if(!isFound) {
                updatedArr = [...cartItems, product];
                const { data: cart } = await axios.patch(`http://localhost:3001/carts/${cartId}`, { 
                     cart: updatedArr,
                });
                console.log(cart.cart);
                setCartItems(updatedArr);
            }
        } catch (error) {
            console.log(error);
        }
*/
