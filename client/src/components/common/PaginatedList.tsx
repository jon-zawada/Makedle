import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "./Button";

interface IPaginatedList {
  itemsPerPage?: number;
  children: React.ReactNode;
  listLength: number;
}

const PaginatedList = ({ itemsPerPage = 20, children, listLength }: IPaginatedList) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(listLength / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons: (string | number)[] = [];

    if (totalPages <= 5) {
      // If total pages <= 5 show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Show first 5 pages and last page
        buttons.push(1, 2, 3, 4, 5, "...");
        buttons.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page and last 5 pages
        buttons.push(1);
        buttons.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        // Show first page, current page +- 1, and last page
        buttons.push(1);
        buttons.push("...");
        buttons.push(currentPage - 1, currentPage, currentPage + 1);
        buttons.push("...");
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  return (
    <div>
      {children}
      <div className="mt-8">
        <div className="flex gap-1 justify-center items-center">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            <ChevronLeft />
          </Button>
          {getPaginationButtons().map((page, index) =>
            typeof page === "number" ? (
              <Button
                size="small-square"
                key={index}
                onClick={() => goToPage(page)}
                className={`${currentPage === page ? "font-bold" : ""}`}
              >
                {page}
              </Button>
            ) : (
              <Button key={index} size="small-square" variant="no-hover">
                {page}
              </Button>
            )
          )}
          <Button
            onClick={() => goToPage(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default PaginatedList;
