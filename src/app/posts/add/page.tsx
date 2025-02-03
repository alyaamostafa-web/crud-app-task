import AddPostForm from "@/features/posts/components/AddPostForm";

const AddPostsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center mb-4 text-3xl font-semibold">Add New post</h2>
      <AddPostForm />
    </div>
  );
};
export default AddPostsPage;
