import React from "react";
import Button from "./Button";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: IModalProps) {
  if (!isOpen) return null;

  /* TODO
    -backdrop click
    -transitions
    -createPortal
  */

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg relative w-full max-w-md overflow-hidden">
        <Button
          variant="ghost"
          onClick={onClose}
          className="rounded-full absolute top-4 right-4 hover:text-gray-800 w-[40px] h-[40px]"
        >
          ✖
        </Button>
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}
        <div className="overflow-auto max-h-[calc(100vh-200px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
