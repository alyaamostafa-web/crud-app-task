import EditPostForm from "../../../../features/posts/components/EditPostForm";

interface IProps {
  params: { id: string };
}
const EditPostPage = async ({ params }: IProps) => {
  const { id } = await params;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center mb-4 text-3xl font-semibold">Edit Post</h2>
      <EditPostForm id={id} />
    </div>
  );
};
export default EditPostPage;
