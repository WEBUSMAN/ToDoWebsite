import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUserTasks = createAsyncThunk(
  "Get UserTasks",
  async (UserID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${UserID}/task`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const CreateUserTasks = createAsyncThunk(
  "Create UserTasks",
  async ({ userID, task }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task`,
        task
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteUserTasks = createAsyncThunk(
  "Delete UserTasks",
  async ({ UserID, TaskID }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${UserID}/task/${TaskID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UpdateUserTasks = createAsyncThunk(
  "Update UserTasks",
  async ({ UserID, TaskID, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${UserID}/task/${TaskID}`,
        data
      );
      return response.data; // Return updated task data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const TaskSlices = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(GetUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CreateUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(CreateUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(DeleteUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(UpdateUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TaskSlices.reducer;
