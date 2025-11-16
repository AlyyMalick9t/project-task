import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";

import { useDispatch } from "react-redux";
import { login } from "../../Redux/slices/authSlice";

// Hardcoded demo users for frontend-only authentication
const demoUsers = [{ email: "Ali@gmail.com", password: "123456" }];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // to show error message

  const handleLogin = () => {
    setError(""); // reset error

    const foundUser = demoUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Login successful
      dispatch(login({ email: foundUser.email }));
      navigate("/dashboard");
    } else {
      // Login failed
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Heading */}
        <Typography variant="h5" fontWeight="bold">
          Log in
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          placeholder="cameron@gmail.com"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#e0e0e0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e0e0e0",
                borderWidth: "1px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666",
              "&.Mui-focused": {
                color: "#666",
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          placeholder="••••••••••"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#e0e0e0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e0e0e0",
                borderWidth: "1px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666",
              "&.Mui-focused": {
                color: "#666",
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Error Message */}
        {error && (
          <Typography color="error" fontSize={14}>
            {error}
          </Typography>
        )}

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            backgroundColor: "#2f2b3a",
            "&:hover": { backgroundColor: "#272436", boxShadow: "none" },
            textTransform: "none",
            borderRadius: "8px",
            py: 1.5,
            fontSize: "16px",
            fontWeight: 500,
            boxShadow: "none",
          }}
          onClick={handleLogin}
        >
          Log in
        </Button>

        {/* Forgot Password */}
        <Link
          href="#"
          underline="none"
          sx={{
            textAlign: "left",
            fontSize: 14,
            mt: 1,
            color: "#2f2b3a",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot your password?
        </Link>
      </Paper>
    </Box>
  );
};

export default Login;
