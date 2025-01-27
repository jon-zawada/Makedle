import React from "react";
import _isEmpty from "lodash/isEmpty";
import { useAuth } from "../../context/AuthProvider";
import _some from "lodash/some";
import { SelectedItems } from "./FilterDropdown";

interface IDropdownMenuProps {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  items: IDropdownMenuItems[];
  fitParent?: boolean;
  isProfile?: boolean;
  isFilter?: boolean;
  selectedItems?: SelectedItems[];
  direction?: "right" | "left";
  textDirection?: "right" | "left" | "center";
  clearSearch?: (e: React.MouseEvent) => void;
  selectAllSearch?: (e: React.MouseEvent) => void;
}

export interface IDropdownMenuItems {
  name: string;
  value?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/* must exist within a relatively positioned element */
export default function DropdownMenu({
  isOpen,
  menuRef,
  items,
  fitParent = false,
  isProfile = false,
  isFilter = false,
  direction,
  textDirection,
  selectedItems, //type this
  clearSearch,
  selectAllSearch,
}: IDropdownMenuProps) {
  const { appUser } = useAuth();
  return (
    <>
      {isOpen && !_isEmpty(items) && (
        <div
          ref={menuRef}
          className={`absolute ${
            direction === "right" ? "right-0" : "left-0"
          } mt-2 ${
            fitParent ? "w-full" : "w-48"
          } bg-white rounded-lg shadow-lg border border-gray-200 z-10`}
        >
          {isProfile && (
            <>
              <div className="w-full text-left px-4 py-2 ">
                {appUser?.username}
              </div>
              <hr />
            </>
          )}
          {isFilter && (
            <>
              <button
                className="w-full text-center px-4 py-2 hover:bg-gray-100"
                onClick={
                  _some(selectedItems, (item) => item.value)
                    ? clearSearch
                    : selectAllSearch
                }
              >
                {_some(selectedItems, (item) => item.value)
                  ? "Clear Search"
                  : "Select All"}
              </button>
              <hr />
            </>
          )}
          <ul className="flex flex-col max-h-60 overflow-y-auto">
            {/* make scrollbar visible always */}
            {items.map((item: IDropdownMenuItems, index) => (
              <li key={item.name} className="flex hover:bg-gray-100">
                {selectedItems && (
                  <div className="w-[30%] flex items-center justify-center text-green-500 text-xl">
                    {selectedItems[index] && selectedItems[index].value && "✓"}
                  </div>
                )}
                <button
                  className={`w-full ${
                    textDirection === "right"
                      ? "text-right"
                      : textDirection === "center"
                      ? "text-center"
                      : "text-left"
                  } px-4 py-2`}
                  onClick={item.onClick}
                  name={item.value}
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
