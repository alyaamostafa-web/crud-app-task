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

type Post = {
  title: string;
  body: string;
  userId: number;
};
type FormErrors = {
  title?: string;
  body?: string;
};
const AddPostForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  //State
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // Validation Errors
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    body: "",
  });

  const addPost = useMutation({
    mutationFn: async (post: Post) =>
      await axiosInstance.post("/posts/add", post).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("post added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      resetForm();
      router.push("/posts");
    },
    onError: (error) => {
      console.error("Error adding post:", error);
      toast.error("Failed to add post. Please try again.", {
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
    setBody("");
    setErrors({});
  };
  // Validation Function
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validate Title
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Validate body
    if (!body.trim()) {
      newErrors.body = "Description is required.";
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
  const isLoading = addPost.isPending;
  //Handler
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    addPost.mutate({
      title,
      body,
      userId: 5, //as it is fake data
    });
  };
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
        placeholder="Enter post body"
        onChange={(e) => {
          setBody(e.target.value);
          clearError("body");
        }}
      />
      {errors.body && <ErrorMessage message={errors.body} />}

      <Button
        isLoading={isLoading}
        className="bg-indigo-600 hover:bg-indigo-800 w-full"
      >
        {isLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
};
export default AddPostForm;
