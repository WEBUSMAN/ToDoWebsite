import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../slices/UserSlices";

const theme = createTheme();

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUser());
    
    // Check localStorage for saved credentials
    const storedEmail = localStorage.getItem("useremail");
    const storedPassword = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe");

    if (rememberMe === "true" && storedEmail && storedPassword) {
      formik.setValues({
        email: storedEmail,
        password: storedPassword,
        remember: true,
      });
    }
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const { users } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = users.find((user) => user.email === values.email);

      if (user) {
        if (user.password !== values.password) {
          handleAlertOpen("User exists but password does not match.");
        } else {
          if (values.remember) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 3);

            localStorage.setItem("useremail", values.email);
            localStorage.setItem("password", values.password);
            localStorage.setItem("expirationDate", expirationDate.getTime());
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.setItem("useremail", values.email);
            localStorage.removeItem("password");
            localStorage.removeItem("expirationDate");
            localStorage.setItem("rememberMe", "false");
          }
          navigate("/homepage");
        }
      } else {
        handleAlertOpen("User does not exist. Please create an account.");
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          mt={8}
          display={"flex"}
          height={460}
          p={2}
          flexDirection={"column"}
          alignItems={"center"}
          borderRadius={7}
          sx={{
            backgroundColor: "rgb(229 230 275)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login Form
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.remember}
                  {...formik.getFieldProps("remember")}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  sx={{
                    fontSize: 15,
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
                  onClick={() => navigate("/signupform")}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity="error"
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default LoginForm;