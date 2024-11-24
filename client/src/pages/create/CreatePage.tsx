import React, { useState } from "react";
import Button from "../../components/common/Button";
import WordleGrid from "../../components/common/WordleGrid";
import { buttonStyles } from "../../components/common/Button";
import _isEmpty from "lodash/isEmpty";

interface IFormData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  file: File | null;
}

const initFormData: IFormData = {
  name: "",
  primaryColor: "#6AAA63",
  secondaryColor: "#C9B458",
  tertiaryColor: "#FF0000",
  file: null,
};

export default function CreatePage() {
  const [form, setForm] = useState<IFormData>(initFormData);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "file" && files) {
      if (name === "file" && files) {
        const file = files[0];
        if (file.type === "text/csv") {
          setForm({ ...form, file });
        } else {
          alert("Please upload a valid CSV file.");
          setForm({ ...form, file: null });
        }
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //API call
    setForm(initFormData);
  };

  const isDisabled: boolean = _isEmpty(form.name) || !form.file;
  console.log("ISDISABLED", isDisabled);
  console.log("Name is empty", _isEmpty(form.name));
  console.log("File is empty", !form.file);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-2xl">Create a game!</div>
      <div className="grid grid-cols-2 gap-20">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <label htmlFor="name">Game Name</label>
          <input
            name="name"
            id="name"
            className="px-4 py-2 border rounded"
            type="text"
            onChange={changeHandler}
          />
          <label htmlFor="">Correct Color</label>
          <input
            type="color"
            name="primaryColor"
            value={form.primaryColor}
            onChange={changeHandler}
          />
          <label htmlFor="">Partially Correct color</label>
          <input
            type="color"
            name="secondaryColor"
            value={form.secondaryColor}
            onChange={changeHandler}
          />
          <label htmlFor="">Incorrect color</label>
          <input
            type="color"
            name="tertiaryColor"
            value={form.tertiaryColor}
            onChange={changeHandler}
          />
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          >
            CSV File
          </label>
          <div className="mt-2 flex items-center">
            <label htmlFor="file-upload" className={buttonStyles()}>
              Choose File
            </label>
            <span className="ml-4 text-sm text-gray-500">
              {form.file instanceof File ? form.file.name : "No file selected"}
            </span>

            <input
              id="file-upload"
              className="hidden"
              name="file"
              type="file"
              accept=".csv, text/csv"
              onChange={changeHandler}
            />
          </div>

          <Button isDisabled={isDisabled}>Create</Button>
        </form>
        <div>
          <WordleGrid
            primaryColor={form.primaryColor}
            secondaryColor={form.secondaryColor}
            tertiaryColor={form.tertiaryColor}
          />
        </div>
      </div>
    </div>
  );
}
