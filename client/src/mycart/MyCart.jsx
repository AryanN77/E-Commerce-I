import React, { useEffect } from "react";
import useGetProducts from "../hooks/useGetProducts.jsx";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import { checkout, getCartPrice } from "../features/cartSlice.js";
import { useNavigate } from "react-router-dom";
import useGetToken from "../hooks/useGetToken.jsx";

function MyCart() {
  const { products } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartPrice = useSelector((state) => state.cart.cartPrice);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartProducts = cartItems
    .map((cartItem) => {
      const product = products.find((product) => product._id === cartItem.id);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter((item) => item != null);
  const handleCheckout = async (e) => {
    e.preventDefault();
    dispatch(checkout({ headers }));
    alert("Order Placed Successfully!!");
    navigate("/");
  };
  useEffect(() => {
    dispatch(getCartPrice(products));
  }, [cartItems, dispatch, cartPrice]);
  if (cartItems.length === 0) {
    return (
      <>
        <div className="w-full h-full flex-1 flex justify-center items-center dark:bg-[#010B13] dark:text-[#DCDCDC]">
          <h1 className="text-2xl font-semibold">Your Cart Is Empty</h1>
        </div>
      </>
    );
  } else {
    return (
      <div className="container mx-auto dark:bg-[#010B13] h-full flex-1 dark:text-[#DCDCDC]">
        <div className="grid grid-cols-1">
          {cartProducts.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
        <div className=" p-3">
          <h2>Total Price of Your Cart: ${cartPrice.toFixed(2)}</h2>
          <button
            className="bg-[#121212] text-[#fff] p-1 rounded-md"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default MyCart;
