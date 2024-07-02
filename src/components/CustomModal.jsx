import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserTasks } from "../slices/TaskSlices";

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(0); }
  to { opacity: 0; transform: translateY(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px #ff69b4; }
  50% { box-shadow: 0 0 20px #ff69b4; }
  100% { box-shadow: 0 0 5px #ff69b4; }
`;

// Styled components
const StyledModalBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 80%;
    padding: 25px;
  }

  @media (max-width: 480px) {
    width: 83%;
    padding: 20px;
    top: 50%;
    left: 50%;
  }
`;

const StyledTextField = styled(TextField)`
  margin: 15px 0;
  width: 100%;

  & label.Mui-focused {
    color: #ff4081;
  }
  & .MuiInput-underline:before {
    border-bottom-color: #ff4081;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #ff4081;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #ff4081;
    }
    &:hover fieldset {
      border-color: #ff80ab;
    }
    &.Mui-focused fieldset {
      border-color: #ff4081;
    }
  }
`;

const StyledButton = styled(Button)`
  margin: 10px 5px;
  padding: 0.55em 1.15em;
  border: 2px solid transparent;
  color: white;
  background-color: #d32f2f;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 12px;
  user-select: none;

  &::before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff003c,
      #ff8a00,
      #fffb00,
      #00ff87,
      #00c8ff,
      #e400ff,
      #ff003c
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 12px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ad1457;
    left: 0;
    top: 0;
    border-radius: 12px;
    z-index: -1;
  }

  @keyframes glowing-button {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  &:hover::before {
    opacity: 0;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 10px 28px;
  }
`;

const StyledTitle = styled(Typography)`
  font-size: 22px;
  margin-bottom: 20px;
  padding: 10px 0px;
  border-radius: 20px;
  font-weight: 600;
  color: #ff1493;
  font-family: monospace;
  letter-spacing: 4px;
  animation: ${glow} 1.5s infinite alternate;
`;

const CustomModal = ({
  open,
  handleClose,
  task: selectedTask,
  handleUpdateTask,
}) => {
  const [taskState, setTaskState] = useState({
    name: "",
    title: "",
    discription: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTaskState({
        name: selectedTask.name,
        title: selectedTask.title,
        discription: selectedTask.discription,
      });
    } else {
      setTaskState({
        name: "",
        title: "",
        discription: "",
      });
    }
  }, [selectedTask]);

  const email = localStorage.getItem("useremail");
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  const handleCreateTask = () => {
    const existUser = users.find((u) => u.email === email);
    if (existUser) {
      dispatch(CreateUserTasks({ userID: existUser.id, task: taskState }));
      setTaskState({
        name: "",
        title: "",
        discription: "",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: taskState.name,
      title: taskState.title,
      discription: taskState.discription,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Task Name is required"),
      title: Yup.string().required("Task Title is required"),
      discription: Yup.string().required("Task Description is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!selectedTask) {
        handleCreateTask();
      } else {
        handleUpdateTask({ ...selectedTask, ...values });
      }
      handleClose();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    formik.handleChange(e);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      closeAfterTransition
    >
      <StyledModalBox>
        <StyledTitle>
          {selectedTask ? "Update Task" : "Create Task"}
        </StyledTitle>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="taskname"
            label="Task Name"
            name="name"
            value={formik.values.name}
            onChange={handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name ? formik.errors.name : ""}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="tasktitle"
            label="Task Title"
            name="title"
            value={formik.values.title}
            onChange={handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title ? formik.errors.title : ""}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="discription"
            label="Task Description"
            name="discription"
            value={formik.values.discription}
            onChange={handleChange}
            error={
              formik.touched.discription && Boolean(formik.errors.discription)
            }
            helperText={
              formik.touched.discription ? formik.errors.discription : ""
            }
          />
          <StyledButton
            type="submit"
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
            {selectedTask ? "Update" : "Create"}
          </StyledButton>
          <StyledButton onClick={handleClose}>Cancel</StyledButton>
        </form>
      </StyledModalBox>
    </Modal>
  );
};

export default CustomModal;
