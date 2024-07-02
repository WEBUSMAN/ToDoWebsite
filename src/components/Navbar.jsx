import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const email = localStorage.getItem("useremail");
  const { users } = useSelector((state) => state.user);
  const existUser = users.find((u) => u.email === email);
  const navigate = useNavigate();

  const getFirstCharacter = (str) => {
    return str ? str.charAt(0).toUpperCase() : "";
  };

  const handleLogOut = () => {
    // localStorage.removeItem("useremail");
    // localStorage.removeItem("password");
    navigate("/loginform");
  };

  return (
    <AppBar
      position="static"
      sx={{
        borderBottomRightRadius: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 90,
        background: "linear-gradient(90deg, #4b6cb7, #182848)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            {existUser ? (
              <IconButton sx={{ p: 0 }}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    backgroundColor: "#ffca28",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4e342e",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {getFirstCharacter(existUser.name)}
                </Box>
              </IconButton>
            ) : null}
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: ".15rem",
              color: "#fff",
              textShadow: "3px 3px 4px rgba(0,0,0,0.9)",
              textAlign: "center",
              flexGrow: 7.5,
            }}
          >
            TODO APP
          </Typography>

          <Box>
            <Button
              onClick={handleLogOut}
              sx={{
                padding: "0.55em 1.15em",
                border: "2px solid transparent",
                color: "white",
                backgroundColor: "#d32f2f",
                cursor: "pointer",
                position: "relative",
                zIndex: 0,
                borderRadius: "12px",
                userSelect: "none",
                "&:before": {
                  content: '""',
                  background:
                    "linear-gradient(45deg, #ff003c, #ff8a00, #fffb00, #00ff87, #00c8ff, #e400ff, #ff003c)",
                  position: "absolute",
                  top: "-2px",
                  left: "-2px",
                  backgroundSize: "400%",
                  zIndex: -1,
                  filter: "blur(5px)",
                  width: "calc(100% + 4px)",
                  height: "calc(100% + 4px)",
                  animation: "glowing-button 20s linear infinite",
                  transition: "opacity 0.3s ease-in-out",
                  borderRadius: "12px",
                },
                "&:after": {
                  zIndex: -1,
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ad1457",
                  left: 0,
                  top: 0,
                  borderRadius: "12px",
                },
                "@keyframes glowing-button": {
                  "0%": { backgroundPosition: "0 0" },
                  "50%": { backgroundPosition: "400% 0" },
                  "100%": { backgroundPosition: "0 0" },
                },
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
