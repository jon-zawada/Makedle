import React, { useState, useRef } from "react";
import Button from "../../components/common/Button";
import WordleGrid from "../../components/common/WordleGrid";
import _isEmpty from "lodash/isEmpty";
import _isNil from "lodash/isNil";
import useHttpService from "../../api/useHttpService";
import PageLayout from "../../components/common/PageLayout";
import ColorIndicator from "../../components/common/ColorIndicator";
import CreatePageForm from "./CreatePageForm";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import SignInToCreatePage from "./SignInToCreatePage";

interface IFormData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  file: File | null;
  image: File | null;
}

const initFormData: IFormData = {
  name: "",
  primaryColor: "#6AAA63",
  secondaryColor: "#C9B458",
  tertiaryColor: "#EB2424",
  file: null,
  image: null,
};

export default function CreatePage() {
  const [form, setForm] = useState<IFormData>(initFormData);
  const [preview, setPreview] = useState<string | null>(null);
  const { appUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      .then(() => {
        setForm(initFormData);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success("Successfully created game");
      })
      .catch(() => toast.error("Error occured while creating game"));
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

  return appUser ? (
    <PageLayout title="Create a game!">
      <div className="grid grid-cols-2 gap-20">
        <CreatePageForm
          gameName={form.name}
          file={form.file}
          fileInputRef={fileInputRef}
          preview={preview}
          handleImageChange={handleImageChange}
          changeHandler={changeHandler}
        />
        <div className="flex flex-col gap-4 p-2">
          <WordleGrid
            primaryColor={form.primaryColor}
            secondaryColor={form.secondaryColor}
            tertiaryColor={form.tertiaryColor}
          />
          <ColorIndicator
            editable={true}
            changeHandler={changeHandler}
            primaryColor={form.primaryColor}
            secondaryColor={form.secondaryColor}
            tertiaryColor={form.tertiaryColor}
          />
        </div>
      </div>
      <div className="flex justify-center p-2">
        <Button onClick={submitHandler} isDisabled={isDisabled}>
          Create Game
        </Button>
      </div>
    </PageLayout>
  ) : (
    <SignInToCreatePage />
  );
}
