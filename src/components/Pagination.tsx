"use client";

import { IconButton, Typography } from "@/components/Material";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}: PaginationProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-blue-gray-50">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Showing <span className="font-bold">{startIndex + 1}</span> to{" "}
        <span className="font-bold">{Math.min(endIndex, totalItems)}</span> of{" "}
        <span className="font-bold">{totalItems}</span> results
      </Typography>

      <div className="flex items-center gap-2">
        <IconButton
          variant="outlined"
          color="blue-gray"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // show first, last, and within 1 of currentPage
              return (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              );
            })
            .map((page, idx, arr) => {
              const prevPage = arr[idx - 1];
              const showEllipsis = prevPage && page - prevPage > 1;

              return (
                <div key={page} className="flex items-center gap-1">
                  {showEllipsis && (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="px-1"
                    >
                      ...
                    </Typography>
                  )}
                  <IconButton
                    variant={currentPage === page ? "filled" : "text"}
                    color={currentPage === page ? "blue" : "blue-gray"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </IconButton>
                </div>
              );
            })}
        </div>

        <IconButton
          variant="outlined"
          color="blue-gray"
          size="sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;
