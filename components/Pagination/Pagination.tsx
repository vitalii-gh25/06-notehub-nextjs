//components/Pagination/Pagination.tsx

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  setPage: (page: number) => void;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  setPage,
  currentPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={handlePageClick}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}
