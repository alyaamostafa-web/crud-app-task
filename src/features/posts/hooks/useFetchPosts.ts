"use client";
import axiosInstance from "@/config/axios.config";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const fetchPosts = async (
  page: number,
  limit: number = 10,
  searchTerm: string = ""
) => {
  const skip = (page - 1) * limit;
  if (searchTerm) {
    const response = await axiosInstance.get(
      `/posts/search?q=${searchTerm}&limit=${limit}&skip=${skip}`
    );
    return response.data;
  }
  const response = await axiosInstance.get(
    `/posts?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const useFetchPosts = (page: number, searchTerm: string) => {
  return useQuery({
    queryKey: ["posts", page, searchTerm],
    queryFn: () => fetchPosts(page, 10, searchTerm),
    placeholderData: keepPreviousData,
  });
};
