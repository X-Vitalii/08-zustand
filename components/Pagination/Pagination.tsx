import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="←"
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
