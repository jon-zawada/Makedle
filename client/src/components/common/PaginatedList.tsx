import React, { useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "./Button";

interface IPaginatedList {
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  children: React.ReactNode;
  listLength: number;
}

const PaginatedList = ({
  currentPage,
  onPageChange,
  itemsPerPage,
  children,
  listLength
}: IPaginatedList) => {
  const totalPages = Math.ceil(listLength / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, listLength);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPaginationButtons = () => {
    const buttons: (string | number)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else if (currentPage <= 3) {
      buttons.push(1, 2, 3, 4, 5, "...");
      buttons.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      buttons.push(1, "...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1, "...");
      buttons.push(currentPage - 1, currentPage, currentPage + 1);
      buttons.push("...", totalPages);
    }

    return buttons;
  };

  const paginationButtons = useMemo(
    () => getPaginationButtons(),
    [currentPage, totalPages]
  );

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
          {paginationButtons.map((page, index) =>
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
      <p className="text-center py-2">
        {start} - {end} of {listLength} Games
      </p>
    </div>
  );
};

export default PaginatedList;
