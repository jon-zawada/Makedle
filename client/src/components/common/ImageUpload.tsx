import React, { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div className="relative w-48 h-48">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
      {image ? (
        <img
          src={image}
          alt="Uploaded Preview"
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div className="w-full h-full bg-secondary flex items-center justify-center rounded">
          Select Image
        </div>
      )}
    </div>
  );
}
