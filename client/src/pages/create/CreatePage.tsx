import React, { useState } from "react";
import Button from "../../components/common/Button";
import WordleGrid from "../../components/common/WordleGrid";
import { buttonStyles } from "../../components/common/Button";
import _isEmpty from "lodash/isEmpty";
import useHttpService from "../../api/useHttpService";

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
  const httpService = useHttpService();

  const isDisabled: boolean = _isEmpty(form.name) || !form.file;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "file" && files) {
      handleFileChange(files);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0].type === "text/csv") {
      setForm({ ...form, file: files[0] });
    } else {
      alert("Please upload a valid CSV file.");
      setForm({ ...form, file: null });
    }
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postGame();
  };

  const postGame = async () => {
    const formData = objectToFormData(form);

    await httpService
      .post("/games", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => setForm(initFormData))
      .catch((error) => console.log(error));
  };

  const objectToFormData = (obj: IFormData) => {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    return formData;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-2xl">Create a game!</div>
      <div className="grid grid-cols-2 gap-20">
        <form className="flex flex-col gap-4 p-2" onSubmit={submitHandler}>
          <label htmlFor="name">Game Name</label>
          <input
            name="name"
            id="name"
            className="px-4 py-2 border rounded"
            type="text"
            value={form.name}
            onChange={changeHandler}
          />
          <label htmlFor="primaryColor">Correct Color</label>
          <input
            type="color"
            id="primaryColor"
            name="primaryColor"
            value={form.primaryColor}
            onChange={changeHandler}
          />
          <label htmlFor="secondaryColor">Partially Correct color</label>
          <input
            type="color"
            id="secondaryColor"
            name="secondaryColor"
            value={form.secondaryColor}
            onChange={changeHandler}
          />
          <label htmlFor="tertiaryColor">Incorrect color</label>
          <input
            type="color"
            id="tertiaryColor"
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
              {form.file ? form.file.name : "No file selected"}
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
