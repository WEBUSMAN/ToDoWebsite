import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "../slices/UserSlices";
import {
  GetUserTasks,
  DeleteUserTasks,
  UpdateUserTasks,
} from "../slices/TaskSlices";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Slide,
  Grid,
} from "@mui/material";
import CustomModal from "./CustomModal";
import Loader from "./loader/Loader";

const ExistUserTasks = ({ setUserId }) => {
  const [Tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const email = localStorage.getItem("useremail");
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(GetUser());
    }
  }, [dispatch, email]);

  const { users, loading: userLoading } = useSelector((state) => state.user);
  const { tasks, loading: taskLoading } = useSelector((state) => state.task);

  useEffect(() => {
    if (users && users.length > 0) {
      const existUser = users.find((u) => u.email === email);
      if (existUser) {
        setUserId(existUser.id);
        dispatch(GetUserTasks(existUser.id));
      }
    }
  }, [dispatch, users, email, setUserId]);

  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks]);

  console.log(tasks);

  const handleDelete = (userId, taskId) => {
    dispatch(DeleteUserTasks({ UserID: userId, TaskID: taskId }))
      .then(() => {
        dispatch(GetUserTasks(userId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    const existUser = users.find((u) => u.email === email);
    if (existUser) {
      dispatch(
        UpdateUserTasks({
          UserID: existUser.id,
          TaskID: updatedTask.id,
          data: updatedTask,
        })
      );
    }
  };

  if (userLoading || taskLoading) {
    return <Loader />;
  }

  if (!tasks || tasks.length === 0) {
    return <Typography>No Tasks found.</Typography>;
  }

  const existUser = users.find((u) => u.email === email);
  console.log(existUser);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        task={selectedTask}
        handleUpdateTask={handleUpdateTask}
      />
      {existUser ? (
        <Grid
          container
          spacing={5}
          mb={10}
          alignItems="center"
          justifyContent="center"
        >
          {Tasks.map((task, index) => (
            <Grid textAlign={"center"} item key={task.id}>
              <Slide direction="up" in={true} timeout={index * 300}>
                <Card
                  sx={{
                    width: 300,
                    padding: "15px",
                    background:
                      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    borderRadius: 10,
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.6)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: "20px", fontFamily: "monospace" }}
                      gutterBottom
                      fontWeight={900}
                      component="div"
                      color="#004d40"
                      textAlign={"left"}
                    >
                      Task {index + 1}:
                    </Typography>
                    <Typography
                      gutterBottom
                      fontWeight={700}
                      component="div"
                      color="#004d40"
                      sx={{ fontSize: "32px", fontFamily: "monospace" }}
                    >
                      {task.name}
                    </Typography>
                    <Typography
                      color="#00695c"
                      sx={{ fontSize: "18px", fontFamily: "monospace" }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      color="#00695c"
                      sx={{ fontSize: "17px", fontFamily: "monospace" }}
                    >
                      {task.discription}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      onClick={() => handleOpenModal(task)}
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
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(existUser.id, task.id)}
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
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No user data found.
        </Typography>
      )}
    </Box>
  );
};

export default ExistUserTasks;
