import ReactPaginate from "react-paginate";

interface IProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination = ({ pageCount, onPageChange }: IProps) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={onPageChange}
      containerClassName={"flex justify-center space-x-2 my-4"}
      activeClassName={"bg-blue-500 text-white font-bold"}
      pageClassName={
        "px-3 py-1 border rounded hover:bg-blue-200 transition-colors"
      }
      previousClassName={
        "px-3 py-1 border rounded hover:bg-blue-200 transition-colors"
      }
      nextClassName={
        "px-3 py-1 border rounded hover:bg-blue-200 transition-colors"
      }
      breakClassName={"px-3 py-1"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
      previousLinkClassName={"flex items-center"}
      nextLinkClassName={"flex items-center"}
      pageLinkClassName={"flex items-center"}
      breakLinkClassName={"flex items-center"}
    />
  );
};

export default Pagination;
