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
import { useFetchSinglePost } from "./../hooks/useFetchSinglePost";

type Post = {
  title: string;
  body: string;
};
interface IProps {
  id: string;
}
const EditPostForm = ({ id }: IProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  //State
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // Validation Errors
  const [errors, setErrors] = useState<{
    title?: string;
    body?: string;
  }>({});

  const { data, isLoading } = useFetchSinglePost(id);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
    }
  }, [data]);

  const editPost = useMutation({
    mutationFn: async (post: Post) =>
      await axiosInstance.put(`/posts/${id}`, post).then((res) => res.data),
    onSuccess: (data) => {
      console.log("post updated  successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("post updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push("/posts");
    },
    onError: (error) => {
      console.error("Error updated  post:", error);
      toast.error("Failed to update post. Please try again.", {
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
      body?: string;
    } = {};

    // Validate Title
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Validate Description
    if (!body.trim()) {
      newErrors.body = "Body is required.";
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

  const isEditLoading = editPost.isPending;
  //Handler
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    editPost.mutate({
      title,
      body,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <form className="space-y-3 max-w-md mx-auto" onSubmit={submitHandler}>
      <Input
        type="text"
        id="title"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          clearError("title");
        }}
      />
      {errors.title && <ErrorMessage message={errors.title} />}
      <Textarea
        value={body}
        placeholder="Enter post Body"
        onChange={(e) => {
          setBody(e.target.value);
          clearError("body");
        }}
      />
      {errors.body && <ErrorMessage message={errors.body} />}

      <Button
        isLoading={isEditLoading}
        className="bg-indigo-600 hover:bg-indigo-800 w-full"
      >
        {isEditLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
};
export default EditPostForm;
