import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";

export const Product = ({ product }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cartItems);
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ prodId: product._id, prodPrice: product.price }));
  };
  return (
    <div className="relative mx-2 w-[300px] h-[350px] border-2 rounded-lg p-3 flex flex-col items-center shadow-md hover:shadow-blue-300">
      <img src={`${product.imageUrl}`} className="w-[80%] h-[60%]" alt="" />
      <div className=" my-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm font-normal opacity-[0.7]">
          {product.description}
        </p>
        <p className="font-bold">${product.price}</p>
      </div>
      <div>
        <button
          className="font-normal text-sm mr-auto bg-black text-[#fff] p-1 hover:shadow-md hover:shadow-slate-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      {product.stock == 0 ? (
        <span className=" absolute block right-1 bottom-3 text-red-500">
          Out of Stock!!
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
