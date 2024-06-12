import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

const connect = () => console.log("connecting...");
const disconnect = () => console.log("disconnecting...");

function BackendApps() {
  useEffect(() => {
    connect();
    return () => disconnect();
  });
  const [productCategory, setProductCategory] = useState("");

  return (
    <>
      <h1>Product List</h1>
      <select
        className="form-select"
        onChange={(e) => setProductCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={productCategory} />
    </>
  );
}

export default BackendApps;
