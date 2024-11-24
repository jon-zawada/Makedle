import React, { useState } from "react";
import Button from "../../components/common/Button";
import WordleGrid from "../../components/common/WordleGrid";
import { buttonStyles } from "../../components/common/Button";
import _isEmpty from "lodash/isEmpty";
import _isNil from "lodash/isNil";
import useHttpService from "../../api/useHttpService";
import ImageUpload from "../../components/common/ImageUpload";

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
  tertiaryColor: "#EB2424",
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
      if (!_isNil(value)) {
        formData.append(key, value);
      }
    });

    return formData;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-2xl">Create a game!</div>
      <div className="grid grid-cols-2 gap-20">
        <form className="flex flex-col gap-4 p-2" onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label htmlFor="name">Game Name</label>
            <input
              name="name"
              id="name"
              className="px-4 py-2 border rounded"
              type="text"
              value={form.name}
              onChange={changeHandler}
            />
          </div>
          <div className="mt-2 flex items-center">
            <label htmlFor="file-upload" className={buttonStyles()}>
              Choose CSV File
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
          <div className="flex justify-center">
            <ImageUpload />
          </div>
        </form>
        <div className="flex flex-col gap-4 p-2">
          <WordleGrid
            primaryColor={form.primaryColor}
            secondaryColor={form.secondaryColor}
            tertiaryColor={form.tertiaryColor}
          />
          <div className="flex flex-col gap-4 border p-4 rounded-md">
            <div className="text-center">Choose Color Indicators</div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center w-16 flex-none">
                <div
                  style={{ backgroundColor: form.primaryColor }}
                  className="w-8 h-8 relative"
                >
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={form.primaryColor}
                    onChange={changeHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="text-sm">Correct</div>
              </div>
              <div className="flex flex-col items-center w-16 flex-none">
                <div
                  style={{ backgroundColor: form.secondaryColor }}
                  className="w-8 h-8 relative"
                >
                  <input
                    type="color"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={form.secondaryColor}
                    onChange={changeHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="text-sm">Partial</div>
              </div>
              <div className="flex flex-col items-center w-16 flex-none">
                <div
                  style={{ backgroundColor: form.tertiaryColor }}
                  className="w-8 h-8 relative"
                >
                  <input
                    type="color"
                    id="tertiaryColor"
                    name="tertiaryColor"
                    value={form.tertiaryColor}
                    onChange={changeHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="text-sm">Incorrect</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button isDisabled={isDisabled}>Create Game</Button>
    </div>
  );
}
