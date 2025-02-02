"use client";
import axiosInstance from "@/config/axios.config";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const fetchPosts = async (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const response = await axiosInstance.get(
    `/posts?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const useFetchPosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
  });
};
