import React from "react";
import { ImageUp } from "lucide-react";

interface IImageUploadProps {
  preview: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUpload({
  preview,
  handleImageChange,
}: IImageUploadProps) {
  return (
    <div className="relative w-64 h-48">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
      {preview ? (
        <img
          src={preview}
          alt="Uploaded Preview"
          className="w-full h-full object-cover rounded border-gray-300 border-2"
        />
      ) : (
        <div className="text-center w-full h-full border-2 border-gray-300 border-dashed flex flex-col items-center justify-center rounded">
          <ImageUp color="#9CA3AF" />
          <div className="text-gray-300">Click to upload image</div>
        </div>
      )}
    </div>
  );
}
