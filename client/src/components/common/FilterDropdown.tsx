import React, { useEffect, useRef, useState } from "react";
import DropdownMenu, { IDropdownMenuItems } from "./DropdownMenu";
import Button from "./Button";
import { SelectOptions } from "../../pages/create/constants";

interface IFilterDropdown {
  name: string;
  items: SelectOptions[];
}

export interface ISelectedItems {
  name: string;
  value: boolean;
}

export default function FilterDropdown({ name, items }: IFilterDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ISelectedItems[]>(
    items.map((item) => ({ name: item.value, value: true }))
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const toggleItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { name } = e.target as HTMLButtonElement;
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, value: !item.value } : item
      )
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest("button")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAllItems = (e: React.MouseEvent, bool: boolean) => {
    e.stopPropagation();
    setSelectedItems((prevItems) =>
      prevItems.map((item) => ({ ...item, value: bool }))
    );
  };

  const dropdownItems: IDropdownMenuItems[] = items.map(
    ({ content, value }: SelectOptions) => ({
      name: content,
      value,
      onClick: toggleItem,
    })
  );

  return (
    <div className="relative" onClick={handleToggle}>
      <Button>{name}</Button>
      <DropdownMenu
        isOpen={isOpen}
        menuRef={menuRef}
        items={dropdownItems}
        isFilter
        selectedItems={selectedItems}
        clearSearch={(e) => toggleAllItems(e, false)}
        selectAllSearch={(e) => toggleAllItems(e, true)}
        textDirection="left"
      />
    </div>
  );
}
