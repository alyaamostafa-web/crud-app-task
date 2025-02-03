"use client";
import Link from "next/link";
import ProductsTable from "./ProductsTable";
import { useState } from "react";
import Input from "@/components/ui/input";

const ProductsDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="my-8 flex justify-between flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" md:w-3/4 sm:w-2/3 border w-full"
        />
        <Link
          href="/products/add"
          className=" rounded-lg text-center bg-indigo-500 px-4 py-2 text-lg font-medium text-white"
        >
          Add New Product
        </Link>
      </div>
      <div className="max-w-5xl">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <ProductsTable searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};
export default ProductsDisplay;
