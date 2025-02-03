import EditProductForm from "@/features/products/components/EditProductForm";

interface IProps {
  params: Promise<{ id: string }>;
}
const EditPrdouctPage = async ({ params }: IProps) => {
  const { id } = await params;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center mb-4 text-3xl font-semibold">Edit Product</h2>
      <EditProductForm id={id} />
    </div>
  );
};
export default EditPrdouctPage;
