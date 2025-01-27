import React, { useEffect, useRef, useState } from "react";
import DropdownMenu, { IDropdownMenuItems } from "./DropdownMenu";
import Button from "./Button";
import { SelectOptions } from "../../pages/create/constants";
import { ChevronDown } from "lucide-react";
import { Filters } from "./FilterComponent";

interface IFilterDropdown {
  name: string;
  items: SelectOptions[];
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface SelectedItems {
  name: string;
  value: boolean;
}

export default function FilterDropdown({
  name,
  items,
  setFilters,
}: IFilterDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems[]>(
    items.map((item) => ({ name: item.value, value: false }))
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const toggleItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { name } = e.target as HTMLButtonElement;
    const newSelectedItems = selectedItems.map((item) =>
      item.name === name ? { ...item, value: !item.value } : item
    );
    setSelectedItems(newSelectedItems);
    const newCategories = newSelectedItems
      .filter((item) => item.value)
      .map((item) => item.name);
    setFilters((prev: Filters) => ({ ...prev, categories: newCategories }));
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
    const newSelectedItems = selectedItems.map((item) => ({
      ...item,
      value: bool,
    }));
    setSelectedItems(newSelectedItems);
    const newCategories = newSelectedItems.map((item) => item.name);
    setFilters((prev: Filters) =>
      bool
        ? { ...prev, categories: newCategories }
        : { ...prev, categories: [] }
    );
  };

  const dropdownItems: IDropdownMenuItems[] = items.map(
    ({ content, value }: SelectOptions) => ({
      name: content,
      value,
      onClick: toggleItem,
    })
  );

  const getDisplayName = (): string => {
    const selectedCount = selectedItems.filter(
      (item) => item.value === true
    ).length;
    const selectedTotal = selectedItems.length;
    if (selectedCount === selectedTotal) {
      return name;
    } else if (selectedCount === 0) {
      return `No ${name}`;
    } else {
      return `${selectedCount}/${selectedTotal} ${name}`;
    }
  };

  return (
    <div className="relative" onClick={handleToggle}>
      <Button className="flex">
        <div>{getDisplayName()}</div>
        <ChevronDown />
      </Button>
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
