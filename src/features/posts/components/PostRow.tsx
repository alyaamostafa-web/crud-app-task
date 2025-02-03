"use client";
import Link from "next/link";
import { Post } from "../types/post";

interface IProps {
  post: Post;
  handleDeleteClick: (id: number) => void;
  isLoadingDelete: boolean;
}

const PostRow = ({ post, handleDeleteClick, isLoadingDelete }: IProps) => {
  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {post.title.slice(0, 20)}...
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {post.body.slice(0, 30)}...
        </td>
        <td className="whitespace-nowrap px-4 py-2 flex gap-x-2">
          <Link
            href={`/posts/${post?.id}/edit`}
            className="inline-block rounded bg-yellow-500 px-4 py-2 text-xs font-medium text-white"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(post.id)}
            disabled={isLoadingDelete}
            className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default PostRow;
