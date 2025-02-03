"use client";
import axiosInstance from "@/config/axios.config";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const fetchProducts = async (
  page: number,
  limit: number = 10,
  searchTerm: string = ""
) => {
  const skip = (page - 1) * limit;
  if (searchTerm) {
    const response = await axiosInstance.get(
      `/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`
    );
    return response.data;
  }

  const response = await axiosInstance.get(
    `/products?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const useFetchProducts = (page: number, searchTerm: string) => {
  return useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: () => fetchProducts(page, 10, searchTerm),
    placeholderData: keepPreviousData,
  });
};
