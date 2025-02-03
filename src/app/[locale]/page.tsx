import ProductsDisplay from "@/features/products/components/ProductsDisplay";

const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
      <ProductsDisplay />
    </div>
  );
};

export default HomePage;
