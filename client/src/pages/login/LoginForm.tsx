import { Box } from "@mui/system";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/AuthProvider";

interface LoginFormProps {
  showSignUp: () => void;
}

export default function LoginForm({ showSignUp }: LoginFormProps) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuth();
  const { email, password } = formValues;

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
    try {
      await handleLogin({ email, password });
    } catch (error) {
      console.log(error);
    }
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
          Login
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
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            margin="normal"
            type="password"
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </FormGroup>
        <Typography
          onClick={showSignUp}
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
          Join Makedle
        </Typography>
      </Box>
    </div>
  );
}
