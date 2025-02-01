import ProductsTable from "@/features/products/components/ProductsTable";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
      <div className="my-8 flex justify-center">
        <Link
          href="/products/add"
          className=" rounded bg-indigo-500 px-4 py-2 text-lg font-medium text-white"
        >
          Add Product
        </Link>
      </div>
      <div className="max-w-5xl">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <ProductsTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
