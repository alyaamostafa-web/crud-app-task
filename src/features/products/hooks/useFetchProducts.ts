"use client";
import axiosInstance from "@/config/axios.config";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const fetchProducts = async (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const response = await axiosInstance.get(
    `/products?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const useFetchProducts = (page: number) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    placeholderData: keepPreviousData,
  });
};
