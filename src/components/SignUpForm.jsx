import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateUser, UpdateUser } from "../slices/UserSlices";

const theme = createTheme();

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Retrieve user data from location state
  const userData = location.state?.user || {};
  const isUpdate = Boolean(userData.id); // Determine if it's an update or create operation

  const validationSchema = Yup.object({
    name: Yup.string().required("User name is required"),
    contact: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: userData.name || "",
      contact: userData.contact || "",
      email: userData.email || "",
      password: userData.password || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (isUpdate) {
          await dispatch(
            UpdateUser({ userID: userData.id, data: values })
          ).unwrap();
        } else {
          await dispatch(CreateUser(values)).unwrap();
        }
        navigate("/loginform");
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          mt={8}
          display="flex"
          p={2}
          borderRadius={7}
          flexDirection="column"
          alignItems="center"
          sx={{
            backgroundColor: "rgb(229, 230, 255)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isUpdate ? "Update User" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps("contact")}
                  error={
                    formik.touched.contact && Boolean(formik.errors.contact)
                  }
                  helperText={formik.touched.contact && formik.errors.contact}
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? (
                            <VisibilityOffIcon color="error" />
                          ) : (
                            <VisibilityIcon color="success" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {isUpdate ? "Update" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    border: "none",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    textDecoration: "underline",
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "none",
                      color: "red",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  onClick={() => navigate("/loginform")}
                >
                  {"Already have an account? Sign in"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;