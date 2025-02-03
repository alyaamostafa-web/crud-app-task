"use client";
import ProductRow from "./ProductRow";
import { Product } from "../types/product";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios.config";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { useFetchProducts } from "../hooks/useFetchProducts";

const ProductsTable = ({ searchTerm }: { searchTerm: string }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedProductId, setClickedProductId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetchProducts(page, searchTerm);

  const handlePageClick = (selectedItem: { selected: number }) => {
    console.log(selectedItem.selected + 1);
    setPage(selectedItem.selected + 1);
  };

  const deleteMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await axiosInstance.delete(`/products/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      console.error("Error deleted  product:", error.message);
      toast.error("Failed to delete product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onSettled: () => {
      setIsModalOpen(false);
      setClickedProductId(null);
    },
  });

  const handleDeleteClick = (productId: number) => {
    setClickedProductId(productId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clickedProductId !== null) deleteMutation.mutate(clickedProductId);
    console.log(clickedProductId);
  };
  const isLoadingDelete = deleteMutation.isPending;

  if (isError)
    return (
      <div className="text-center py-6 text-lg">
        Error loading products. Please try again later.
      </div>
    );
  if (isLoading)
    return <div className="text-center py-6 text-lg">Loading...</div>;

  return (
    <>
      <div className=" rounded-t-lg">
        <table className="w-full  divide-y-2  divide-gray-200 bg-white text-sm text-left rtl:text-right">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.products?.length ? (
              data?.products?.map((product: Product) => (
                <ProductRow
                  product={product}
                  key={product.id}
                  handleDeleteClick={handleDeleteClick}
                  isLoadingDelete={isLoadingDelete}
                />
              ))
            ) : (
              <tr className="text-center p-9 inline-block ">
                <td>No Products</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data?.products?.length ? (
        <div className="border-t border-gray-200 ">
          <Pagination
            pageCount={Math.ceil(data.total / 10)}
            onPageChange={handlePageClick}
          />
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={"Confirm Deletion"}
      >
        <p>Are you sure you want to delete this product</p>
      </Modal>
    </>
  );
};

export default ProductsTable;
