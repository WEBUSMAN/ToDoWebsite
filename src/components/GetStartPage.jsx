import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import "@fontsource/pacifico"; // Importing a custom font

const imageUrls =
  "https://ideogram.ai/assets/progressive-image/balanced/response/a_ex8Nb5SK-mXh0WPUwlpw";

const GetStartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/loginform");
  };

  const glow = keyframes`
    0% { box-shadow: 0 0 5px #f50057, 0 0 10px #f50057, 0 0 20px #f50057, 0 0 40px #f50057; }
    50% { box-shadow: 0 0 10px #ff4081, 0 0 20px #ff4081, 0 0 40px #ff4081, 0 0 80px #ff4081; }
    100% { box-shadow: 0 0 5px #f50057, 0 0 10px #f50057, 0 0 20px #f50057, 0 0 40px #f50057; }
  `;

  return (
    <Box
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Pacifico', cursive", // Applying custom font
      }}
    >
      <img
        src={imageUrls}
        alt="Random Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "66%",
        }}
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)", // Darker semi-transparent overlay
        }}
      >
        <Box mt={52} textAlign={"center"} color={"#fff"}>
          <Typography
            variant="h4"
            fontWeight={400}
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Welcome To The
            <br />
            <span style={{ color: "yellow", fontWeight: 700 }}>
              ToDo App! 🙂
            </span>
          </Typography>
          <Button
            sx={{
              backgroundColor: "#f50057",
              color: "#fff",
              padding: "10px 40px",
              fontSize: "1.2rem",
              marginTop: 4,
              fontWeight: 600,
              borderRadius: "50px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.6)",
              transition: "0.3s ease-in-out",
              animation: `${keyframes({
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
                "100%": { transform: "scale(1)" },
              })} 2s infinite, ${glow} 1.5s infinite alternate`,
              "&:hover": {
                backgroundColor: "#ff4081",
                boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
              },
            }}
            onClick={handleStart}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GetStartPage;
