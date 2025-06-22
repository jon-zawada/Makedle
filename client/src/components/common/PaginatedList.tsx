import React, { useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@mui/material"

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
            disabled={currentPage === 1}
            color="inherit"
          >
            <ChevronLeft />
          </Button>
          {paginationButtons.map((page, index) =>
            typeof page === "number" ? (
              <Button
                color="inherit"
                key={index}
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ) : (
              <Button
                disabled
                color="inherit"
                key={index}
                sx={{
                  color: 'inherit',
                  '&.Mui-disabled': {
                    color: 'inherit',
                    opacity: 1,
                  },
                }}
              >
                {page}
              </Button>
            )
          )}
          <Button
            color="inherit"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
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
