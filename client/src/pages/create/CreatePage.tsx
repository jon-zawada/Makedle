import React, { useState, useRef } from "react";
import _isNil from "lodash/isNil";
import useHttpService from "../../api/useHttpService";
import PageLayout from "../../components/common/PageLayout";
import CreatePageForm from "./CreatePageForm";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import SignInToCreatePage from "./SignInToCreatePage";
import FormStepper from "../../components/common/FormStepper";
import CreatePageInfo from "./CreatePageInfo";
import CreatePageForm2 from "./CreatePageForm2";
import CreatePageForm3 from "./CreatePageForm3";

interface IFormData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  file: File | null;
  image: File | null;
  category: string;
  isPrivate: boolean;
}

const initFormData: IFormData = {
  name: "",
  primaryColor: "#6AAA63",
  secondaryColor: "#C9B458",
  tertiaryColor: "#EB2424",
  file: null,
  image: null,
  category: "",
  isPrivate: false,
};

export default function CreatePage() {
  const [form, setForm] = useState<IFormData>(initFormData);
  const [preview, setPreview] = useState<string | null>(null);
  const { appUser, loadingAppUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const httpService = useHttpService();

  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "file") {
      const { files } = event.target as HTMLInputElement;
      handleFileChange(files);
    } else if (name === "isPrivate") {
      setForm({ ...form, isPrivate: value === "true" });
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    await postGame(); //after this should we navigate them to the game?
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
    <PageLayout title="Create a New Game" loading={loadingAppUser}>
      <FormStepper submitHandler={submitHandler}>
        <CreatePageInfo />
        <CreatePageForm
          gameName={form.name}
          file={form.file}
          fileInputRef={fileInputRef}
          preview={preview}
          handleImageChange={handleImageChange}
          changeHandler={changeHandler}
        />
        <CreatePageForm2
          category={form.category}
          isPrivate={form.isPrivate}
          changeHandler={changeHandler}
        />
        <CreatePageForm3
          primaryColor={form.primaryColor}
          secondaryColor={form.secondaryColor}
          tertiaryColor={form.tertiaryColor}
          changeHandler={changeHandler}
        />
      </FormStepper>
    </PageLayout>
  ) : (
    <SignInToCreatePage />
  );
}
