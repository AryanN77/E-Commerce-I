import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetToken from "./useGetToken.jsx";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:8080/shop/", {
        headers,
      });
      setProducts(response.data.products);
    };
    fetchProducts();
  }, []);

  return { products };
};

export default useGetProducts;
