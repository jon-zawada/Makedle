import React, { LegacyRef } from "react";
import ImageUpload from "../../components/common/ImageUpload";
import { buttonStyles } from "../../components/common/Button";
import { TextField } from "@mui/material";

interface ICreatePageFormProps {
  gameName: string;
  file: File | null;
  fileInputRef: LegacyRef<HTMLInputElement> | null;
  preview: string | null;
  handleImageChange: (file: File, dataUrl: string) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePageForm({
  gameName,
  file,
  fileInputRef,
  preview,
  handleImageChange,
  changeHandler,
}: ICreatePageFormProps) {
  return (
    <form className="flex flex-col gap-4 p-2">
      <TextField
        label="Game Name"
        name="name"
        value={gameName}
        onChange={changeHandler}
        margin="normal"
        sx={{ backgroundColor: "background.paper" }}
      />
      <div className="mt-2 flex items-center">
        <label htmlFor="file-upload" className={buttonStyles()}>
          Choose CSV File
        </label>
        <span className="ml-4 text-sm text-gray-500">
          {file ? file.name : "No file selected"}
        </span>
        <input
          id="file-upload"
          ref={fileInputRef as React.LegacyRef<HTMLInputElement>}
          className="hidden"
          name="file"
          type="file"
          accept=".csv, text/csv"
          onChange={changeHandler}
        />
      </div>
      <div className="flex justify-center">
        <ImageUpload preview={preview} handleImageChange={handleImageChange} />
      </div>
    </form>
  );
}
