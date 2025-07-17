// components/Pagination.jsx
/* eslint-disable react/prop-types */

const Pagination = ({ page, setPage, totalPages, disabled }) => {
  const goToPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-md mx-1 border border-gray-300 transition-all duration-200 ${
            page === i ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-100"
          }`}
          disabled={disabled}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={goToPrev}
        disabled={page === 1 || disabled}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-blue-100 disabled:opacity-50"
      >
        Prev
      </button>

      {renderPageNumbers()}

      <button
        onClick={goToNext}
        disabled={page === totalPages || disabled}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-blue-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
