import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // fetch products
  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        search ? { params: { search } } : {}
      );
      // console.log("API response:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  // add product
  const addProduct = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, data);
      setProducts([res.data, ...products]);
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // update product
  const updateProduct = async (id, data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, data);
      setProducts(products.map(p => p.id === id ? { ...p, ...data } : p));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <div className="min-h-screen bg-gray-900 text-white p-4 max-w-2xl mx-auto">
      <Header search={search} setSearch={setSearch} />
      <ProductForm onAdd={addProduct} />
      <ProductList
        products={products}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />
    </div>
    </div>
  );
}

export default App;
