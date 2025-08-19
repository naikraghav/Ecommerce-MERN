import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common/index.jsx";
import AdminProductCard from "../components/AdminProductCard.jsx";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await fetch(SummaryApi.allProducts.url);
    const dataResponse = await response.json();

    setAllProducts(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload product
        </button>
      </div>

      {/* all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-200px)] overflow-y-auto">
        {
          allProducts.map((product,index) => {
            return (
              <AdminProductCard key={index+"allProduct"} data={product} fetchdata={fetchAllProducts} />
            );
          })}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProducts} />
      )}
    </div>
  );
};

export default AllProducts;
