"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/Textarea";
import axiosInstance from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/ui/ErrorMessage";

type Product = {
  title: string;
  description: string;
  price: number | null;
};
type FormErrors = {
  title?: string;
  description?: string;
  price?: string;
};
const AddProductForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  //State
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  // Validation Errors
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    description: "",
    price: "",
  });

  const addProduct = useMutation({
    mutationFn: async (product: Product) =>
      await axiosInstance
        .post("/products/add", product)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      resetForm();
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to add product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setErrors({});
  };
  // Validation Function
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validate Title
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Validate Description
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    // Validate Price
    if (price === null || price === undefined || price <= 0) {
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
  const isLoading = addProduct.isPending;
  //Handler
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    addProduct.mutate({
      title,
      description,
      price,
    });
  };
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
        value={price ?? ""}
        min={0}
        onChange={(e) => {
          setPrice(Number(e.target.value));
          clearError("price");
        }}
      />
      {errors.price && <ErrorMessage message={errors.price} />}
      <Button
        isLoading={isLoading}
        className="bg-indigo-600 hover:bg-indigo-800 w-full"
      >
        {isLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
};
export default AddProductForm;
