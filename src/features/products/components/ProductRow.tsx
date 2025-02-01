"use client";
import Link from "next/link";
import { Product } from "../types/product";

interface IProps {
  product: Product;
  handleDeleteClick: (id: number) => void;
  isLoadingDelete: boolean;
}

const ProductRow = ({
  product,
  handleDeleteClick,
  isLoadingDelete,
}: IProps) => {
  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {product.title.slice(0, 20)}...
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {product.description.slice(0, 30)}...
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {product.price}
        </td>
        <td className="whitespace-nowrap px-4 py-2 flex space-x-2">
          <Link
            href={`/products/${product?.id}/edit`}
            className="inline-block rounded bg-yellow-500 px-4 py-2 text-xs font-medium text-white"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(product.id)}
            disabled={isLoadingDelete}
            className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductRow;
