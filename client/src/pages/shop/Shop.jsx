import React, { useEffect } from "react";
import useGetProducts from "../../hooks/useGetProducts.jsx";
import { Product } from "./Product.jsx";

const Shop = () => {
  const { products } = useGetProducts();
  return (
    <div className="w-full h-full p-3 flex flex-col justify-center items-center dark:bg-[#010B13] dark:text-[#DCDCDC]">
      <h1 className="my-2 text-2xl font-bold dark:text-[#fff]">Our Shop!</h1>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap gap-2">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
