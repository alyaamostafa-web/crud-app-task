import PostssDisplay from "@/features/posts/components/PostsDisplay";

const PostsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Post</h1>
      <PostssDisplay />
    </div>
  );
};

export default PostsPage;
