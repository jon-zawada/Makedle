import React, { useState } from "react";
import { ImageUp } from "lucide-react";
import ImageCropper from "../ImageCropper";
import { Box, Modal } from "@mui/material";

interface IImageUploadProps {
  preview: string | null;
  handleImageChange: (file: File, dataUrl: string) => void;
}

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function ImageUpload({
  preview,
  handleImageChange,
}: IImageUploadProps) {
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  function dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleCroppedImage = (croppedImageUrl: string) => {
    handleImageChange(
      dataURLtoFile(croppedImageUrl, "cropped.png"),
      croppedImageUrl
    );
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setImageToCrop(null);
  };

  return (
    <div className="relative w-[300px] h-[225px]">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleFileChange}
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

      <Modal open={!!showCropper && !!imageToCrop} onClose={handleCancelCrop}>
        <Box sx={style}>
          <ImageCropper
            imageSrc={imageToCrop}
            onCropComplete={handleCroppedImage}
            handleCancelCrop={handleCancelCrop}
          />
        </Box>
      </Modal>
    </div>
  );
}
