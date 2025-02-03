import AddProductForm from "@/features/products/components/AddProductForm";

const AddPrdouctPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Add New Product
      </h2>
      <AddProductForm />
    </div>
  );
};
export default AddPrdouctPage;
