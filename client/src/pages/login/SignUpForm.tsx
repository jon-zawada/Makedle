import { Box } from "@mui/system";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useHttpService from "../../api/useHttpService";
import toast from "react-hot-toast";

interface SignUpProps {
  showLogin: () => void;
}

export default function SignUp({ showLogin }: SignUpProps) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const httpService = useHttpService();
  const { email, password, username } = formValues;

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    // border: "2px solid #000",
    // boxShadow: 24,
    p: 4,
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    httpService
      .post("/users", formValues)
      .then(() => {
        toast.success("User successfully created");
        showLogin();
      })
      .catch(() => toast.error("Something went wrong making your user"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Box component="form" onSubmit={submitHandler} sx={style}>
        <Typography variant="h6" gutterBottom>
          Sign Up
        </Typography>
        <FormGroup>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />
          <TextField
            label="User Name"
            name="username"
            value={username}
            onChange={handleChange}
            margin="normal"
            type="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            margin="normal"
            type="password"
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </FormGroup>
        <Typography
          onClick={showLogin}
          sx={{
            mt: 3,
            textAlign: "center",
            display: "block",
            textDecoration: "none",
            color: "primary.main",
            "&:hover": {
              textDecoration: "underline",
            },
            cursor: "pointer",
          }}
        >
          Already on Makedle?
        </Typography>
      </Box>
    </div>
  );
}
