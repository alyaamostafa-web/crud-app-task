"use client";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/ui/input";
import PostsTable from "./PostsTable";

const PostssDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
      <div className="my-8 flex justify-between flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" md:w-3/4 sm:w-2/3 border w-full"
        />
        <Link
          href="/posts/add"
          className=" rounded-lg text-center bg-indigo-500 px-4 py-2 text-lg font-medium text-white"
        >
          Add New Post
        </Link>
      </div>
      <div className="max-w-5xl">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <PostsTable searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};
export default PostssDisplay;
