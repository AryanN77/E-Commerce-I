import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decrementCartItemCount,
  getCartPrice,
  incrementCartItemCount,
} from "../features/cartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="relative mx-2 gap-2 my-2 h-[150px] border-2 rounded-lg p-3 flex  items-center shadow-md hover:shadow-blue-300 hover:bg-zinc-400 hover:text-blue-950">
      <img
        src={`${product.imageUrl}`}
        className="w-[20%] h-[90%] rounded-md mr-4"
        alt=""
      />
      <div className="my-1 flex flex-col">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm font-normal opacity-[0.7]">
          {product.description}
        </p>
        <p className="font-bold">${product.price}</p>
        <div className="my-2">
          <p className="font-semibold">Quantity: {product.quantity}</p>
          <div className="inline-flex rounded-md shadow-sm mt-2" role="group">
            <button
              className="px-1 border-2 hover:bg-slate-300 rounded-s-lg "
              onClick={() => {
                dispatch(incrementCartItemCount(product._id));
              }}
            >
              +
            </button>
            <button
              className="px-1 border-2 hover:bg-slate-300 rounded-e-lg"
              onClick={() => {
                dispatch(decrementCartItemCount(product._id));
                dispatch(getCartPrice());
              }}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
