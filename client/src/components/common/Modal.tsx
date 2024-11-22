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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg relative w-full max-w-md mx-4">
        <Button
          onClick={onClose}
          className="rounded-full absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </Button>
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
}
