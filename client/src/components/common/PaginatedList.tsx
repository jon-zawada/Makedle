import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "./Button";

interface IPaginatedList {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage?: number;
  children: React.ReactNode;
  listLength: number;
  getItems: (page: number) => void;
}

const PaginatedList = ({
  currentPage,
  setCurrentPage,
  itemsPerPage = 20,
  children,
  listLength,
  getItems,
}: IPaginatedList) => {
  const totalPages = Math.ceil(listLength / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, listLength);
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    getItems(page);
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
    /* EDGE CASE LIST IS EMPTY */
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
        {start} - {end} of {listLength} Games
      </p>
    </div>
  );
};

export default PaginatedList;
