"use client";
import axiosInstance from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async (id: string) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};

export const useFetchSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });
};
