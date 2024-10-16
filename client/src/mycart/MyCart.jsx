import React, { useEffect } from "react";
import useGetProducts from "../hooks/useGetProducts.jsx";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import { getCartPrice } from "../features/cartSlice.js";

function MyCart() {
  const { products } = useGetProducts();
  const dispatch = useDispatch();
  const cartPrice = useSelector((state) => state.cart.cartPrice);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartProducts = cartItems
    .map((cartItem) => {
      const product = products.find((product) => product._id === cartItem.id);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter((item) => item != null);

  useEffect(() => {
    dispatch(getCartPrice(products));
  }, [cartItems, dispatch, cartPrice]);
  if (cartItems.length === 0) {
    return (
      <>
        <div className="w-full h-full flex-1 flex justify-center items-center">
          <h1 className="text-2xl font-semibold">Your Cart Is Empty</h1>
        </div>
      </>
    );
  } else {
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-1">
          {cartProducts.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
        <div className=" p-3">
          <h2>Total Price of Your Cart: ${cartPrice.toFixed(2)}</h2>
        </div>
      </div>
    );
  }
}

export default MyCart;
