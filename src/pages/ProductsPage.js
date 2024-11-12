import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import CategoriesList from "../components/CategoriesList";
import axios from "axios";

function ProductsPage() {
  // تذكر انو حطينا الستيت هون في الاب عشان يسهل علينا التعديل عليها من الابناء كلهم
  const [products, setProducts] = useState([]);

  // fetch products:
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3001/products");
    setProducts(response.data);
  };

  // filter products by category:
  const filterProductsByCategory = async (category) => {
    if (category === "All") {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
      return;
    }
    const response = await axios.get(
      `http://localhost:3001/products?category=${category}`
    );
    setProducts(response.data);
  };

  // filter by search:
  const filterBySearch = async (value) => {
    const { data } = await axios.get("http://localhost:3001/products");
    const items = data.filter((item) => {
      const { name } = item;
      return name.toLowerCase().includes(value.toLowerCase().trim()); // تذكر التريم بتصير على السترينغ ولازم تعمل انفوك الها صح
    });

    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <CategoriesList
        onChange={filterProductsByCategory}
        filterBySearch={filterBySearch}
      />
      <ProductsList products={products} />
    </div>
  );
}

export default ProductsPage;
