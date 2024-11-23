import React from "react";
import _isEmpty from "lodash/isEmpty";

interface IDropdownMenuProps {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  items: IDropdownMenuItems[];
}

export interface IDropdownMenuItems {
  name: string;
  onClick: (event: React.MouseEvent) => void;
}

/* must exist within a relatively positioned element */
export default function DropdownMenu({
  isOpen,
  menuRef,
  items,
}: IDropdownMenuProps) {
  return (
    <>
      {isOpen && !_isEmpty(items) && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
        >
          <ul className="flex flex-col">
            {items.map((item: IDropdownMenuItems) => (
              <li key={item.name}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={item.onClick}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
