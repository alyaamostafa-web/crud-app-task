"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/Textarea";
import axiosInstance from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchSingleProduct } from "../hooks/useFetchSingleProduct";

type Product = {
  title: string;
  description: string;
  price?: number;
};
interface IProps {
  id: string;
}
const EditProductForm = ({ id }: IProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  //State
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  // Validation Errors
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    price?: string;
  }>({});

  const { data, isLoading } = useFetchSingleProduct(id);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
    }
  }, [data]);

  const editProduct = useMutation({
    mutationFn: async (product: Product) =>
      await axiosInstance
        .put(`/products/${id}`, product)
        .then((res) => res.data),
    onSuccess: (data) => {
      console.log("Product updated  successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push("/");
    },
    onError: (error) => {
      console.error("Error updated  product:", error);
      toast.error("Failed to update product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Validation Function
  const validateForm = () => {
    const newErrors: {
      title?: string;
      description?: string;
      price?: string;
    } = {};

    // Validate Title
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Validate Description
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    // Validate Price
    if (price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const clearError = (field: keyof typeof errors) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };
  const isEditLoading = editProduct.isPending;
  //Handler
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    editProduct.mutate({
      title,
      description,
      price,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <form className="space-y-3 max-w-md mx-auto" onSubmit={submitHandler}>
      <Input
        type="text"
        id="title"
        placeholder="Enter product title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          clearError("title");
        }}
      />
      {errors.title && <ErrorMessage message={errors.title} />}
      <Textarea
        value={description}
        placeholder="Enter product description"
        onChange={(e) => {
          setDescription(e.target.value);
          clearError("description");
        }}
      />
      {errors.description && <ErrorMessage message={errors.description} />}
      <Input
        type="number"
        id="price"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => {
          setPrice(Number(e.target.value));
          clearError("price");
        }}
      />
      {errors.price && <ErrorMessage message={errors.price} />}
      <Button
        isLoading={isEditLoading}
        className="bg-indigo-600 hover:bg-indigo-800 w-full"
      >
        {isEditLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
};
export default EditProductForm;
