"use client";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios.config";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { useFetchPosts } from "../hooks/useFetchPosts";
import PostRow from "./PostRow";
import { Post } from "../types/post";

const PostsTable = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPostId, setClickedPostId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetchPosts(page);

  const handlePageClick = (selectedItem: { selected: number }) => {
    console.log(selectedItem.selected + 1);
    setPage(selectedItem.selected + 1);
  };

  const deleteMutation = useMutation({
    mutationFn: async (PostId: number) => {
      const response = await axiosInstance.delete(`/posts/${PostId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      console.error("Error deleted  post:", error.message);
      toast.error("Failed to delete post. Please try again.", {
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
      setClickedPostId(null);
    },
  });

  const handleDeleteClick = (PostId: number) => {
    setClickedPostId(PostId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clickedPostId !== null) deleteMutation.mutate(clickedPostId);
    console.log(clickedPostId);
  };
  const isLoadingDelete = deleteMutation.isPending;

  if (isError) return <div>Error loading posts. Please try again later.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className=" rounded-t-lg">
        <table className="w-full  divide-y-2  divide-gray-200 bg-white text-sm text-left">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                body
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.posts?.length ? (
              data?.posts?.map((post: Post) => (
                <PostRow
                  post={post}
                  key={post.id}
                  handleDeleteClick={handleDeleteClick}
                  isLoadingDelete={isLoadingDelete}
                />
              ))
            ) : (
              <tr>No Posts yet!</tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 ">
        <Pagination
          pageCount={Math.ceil(data.total / 10)}
          onPageChange={handlePageClick}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={"Confirm Deletion"}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </>
  );
};

export default PostsTable;
