import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Navbar from "./Navbar";
import ExistUserTasks from "./ExistUserTasks";
import CustomModal from "./CustomModal";
import { GetUser, DeleteUser } from "../slices/UserSlices";
import { useNavigate } from "react-router-dom";
import AlertComp from "./AlertComp";

const pulseAnimation = {
  animation: "pulse 1.2s infinite",
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.05)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
};

const styles = {
  button: {
    my: 1,
    mx: 1,
    color: "white",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    transition: "all 0.3s ease-in-out",
    textTransform: "none",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    "&:active": {
      transform: "scale(0.9)",
    },
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    ...pulseAnimation,
  },
  card: {
    maxWidth: 345,
    m: 2,
    borderRadius: "20px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
    },
    background: "linear-gradient(to right, #fff1eb, #ace0f9)",
    color: "#333",
  },
};

const HomePage = () => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [userId, setUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = localStorage.getItem("useremail");

  const handleShowAllUsers = () => {
    setShowAllUsers((prevState) => !prevState);
    if (!showAllUsers) {
      dispatch(GetUser());
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteAccount = () => {
    if (userId) {
      dispatch(DeleteUser(userId)).then(() => {
        navigate("/loginform");
      });
    }
  };

  const handleUpdateUser = () => {
    const existUser = users.find((u) => u.email === email);
    if (existUser) {
      navigate("/signupform", { state: { user: existUser } });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #E0EAFC, #CFDEF3)",
        minHeight: "100vh",
      }}
    >
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        userId={userId}
      />
      <AlertComp text="Your Account is Created Successfully 🙂" />
      <Navbar />
      <Box
        ml={{ xs: 0, sm: 1, md: 4, lg: 4 }}
        gap={{ xs: 0, sm: 0, md: 3, lg: 3 }}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row", md: "row", lg: "row" },
          flexWrap: "wrap",
          justifyContent: {
            xs: "start",
            sm: "start",
            md: "center",
            lg: "center",
          },
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            ...styles.button,
          }}
          onClick={handleOpenModal}
        >
          Add Task
        </Button>
        <Button
          variant="contained"
          sx={{
            ...styles.button,
          }}
          onClick={handleUpdateUser}
        >
          Update User
        </Button>
        <Button
          variant="contained"
          sx={{
            ...styles.button,
          }}
          onClick={handleShowAllUsers}
        >
          {showAllUsers ? "Hide All Users" : "Show All Users"}
        </Button>
        <Button
          variant="contained"
          sx={{
            ...styles.button,
          }}
          onClick={handleDeleteAccount}
        >
          Delete Your Account
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        mt={4}
        px={2}
      >
        {showAllUsers &&
          users.map((user) => (
            <Card key={user.id} sx={styles.card}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  fontWeight={700}
                  color="#111"
                >
                  {user.name}
                </Typography>
                <Typography variant="body1" color="#222">
                  <b>Email:</b> {user.email}
                </Typography>
                <Typography variant="body1" color="#222">
                  <b>Contact:</b> {user.contact}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
      <ExistUserTasks setUserId={setUserId} />
    </Box>
  );
};

export default HomePage;
