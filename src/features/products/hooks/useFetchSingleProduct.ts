"use client";
import axiosInstance from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";

const fetchProduct = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const useFetchSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
  });
};
